pub mod entrypoint;
pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;
/*- **lib.rs** - 注册模块
- **entrypoint.rs** - 程序入口点
- **instruction.rs** - 序列化和反序列化指令数据
- **processor.rs** - 处理指令的程序逻辑
- **state.rs** - 序列化和反序列化状态 定义了我们的程序用于填充新账户的数据字段的结构体
- **error.rs** - 自定义程序错误 */
