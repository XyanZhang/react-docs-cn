# 逃生舱

你的一些组件可能需要控制和同步 React 之外的系统。例如，您可能需要使用浏览器 API 聚焦输入，播放和暂停未使用 React 实现的视频播放器，或者连接并收听来自远程服务器的消息。在本章中，您将学习让您“走出”React 并连接到外部系统的逃生舱口。大多数应用程序逻辑和数据流不应依赖这些功能。

> 在本章
>
> - 如何在不重新渲染的情况下“记住”信息
> - 如何访问 React 管理的 DOM 元素
> - 如何将组件与外部系统同步
> - 如何从组件中删除不必要的 effects
> - Effect 的生命周期与组件的生命周期有何不同
> - 如何防止某些值重新触发 Effects
> - 如何减少 Effect 重新运行的频率
> - 如何在组件之间共享逻辑

## 使用 refs

当你想让一个组件“记住”一些信息，但又不想让这些信息触发新的渲染时，你可以使用 ref:

```jsx
const ref = useRef(0);
```

与状态一样，refs 在重新渲染之间由 React 保留。但是，设置状态会重新渲染组件。更改 ref 不会！您可以通过 ref.current 属性访问该 ref 的当前值。

```jsx live
function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

<div>
阅读这个主题 [使用 refs]('useRef')
</div>

## 使用 refs 操作 DOM

React 会自动更新 DOM 以匹配您的渲染输出，因此您的组件不需要经常操作它。然而，有时您可能需要访问由 React 管理的 DOM 元素——例如，聚焦一个节点、滚动到它或测量它的大小和位置。在 React 中没有内置的方法来做这些事情，所以你需要一个 DOM 节点的引用。例如，单击按钮将使用 ref 聚焦输入：

```jsx live
function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

## Effects 同步

一些组件需要与外部系统同步。例如，您可能希望根据 React 状态控制非 React 组件、设置服务器连接或在组件出现在屏幕上时发送分析日志。与让您处理特定事件的事件处理程序不同，Effects 让您在渲染后运行一些代码。使用它们将你的组件与 React 之外的系统同步。

按播放/暂停几次，看看视频播放器如何与 isPlaying 属性值保持同步

```jsx live
function App() {

  function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);
  
    useEffect(() => {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }, [isPlaying]);
    
    // 每次 isPlaying 切换时，都会重新渲染这个组件
    return <video style={{width: '100%'}} ref={ref} src={src} loop playsInline />;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div style={{display:'flex', width: '200px'}}>
      <button onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? 'Pause' : 'Play'}
      </button> 
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </div>
  );
}

```

许多效果器也会自行“清理”。例如，一个建立到聊天服务器连接的 Effect 应该返回一个清理函数，告诉 React 如何断开你的组件与该服务器的连接：

```jsx live
function ChatRoom() {

  function createConnection() {
    // A real implementation would actually connect to the server
    return {
      connect() {
        console.log('✅ Connecting...');
      },
      disconnect() {
        console.log('❌ Disconnected.');
      }
    };
  }

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

## 你可能不需要 effect

Effects 是 React 范式的逃生通道。它们让你“走出”React 并将你的组件与一些外部系统同步。如果不涉及外部系统（例如，如果您想在某些道具或状态更改时更新组件的状态），则不需要 Effect。删除不必要的 Effects 将使您的代码更易于理解、运行速度更快并且更不容易出错。

有两种常见情况不需要 Effects：

- 您不需要 Effects 来转换数据以进行渲染。
- 您不需要 Effects 来处理用户事件。

例如，您不需要 Effect 来根据其他状态调整某些状态：

```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  {/* highlight-start */}
  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
  {/* highlight-end */}
}
```

相反，在渲染时尽可能多地计算：

```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  {/* highlight-start */}
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
  {/* highlight-end */}
}
```

但是，您确实需要 Effects 才能与外部系统同步。
