use solana_program::program_error::ProgramError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ReviewError {
    /*
    - 在尚未初始化的账户上调用了更新指令
    - 提供的 PDA 与预期的或派生的 PDA 不匹配
    - 输入数据超过了程序允许的大小
    - 提供的评分不在 1-5 的范围内 */
    #[error("Account not initialized yet")]
    UninitializedAccount,

    #[error("PDA derived does not equal PDA passed in")]
    InvalidPDA,

    #[error("Input data exceeds max length")]
    InvalidDataLength,

    #[error("Rating greater than 5 or less than 1")]
    InvalidRating,

    #[error("Accounts do not match")]
    IncorrectAccountError,
}

//编译器期望程序返回的错误类型是来自 `solana_program` crate 的 `ProgramError` 类型
// 下面的实现处理了我们自定义错误和 `ProgramError` 类型之间的转换。
//并且在使用抛出自定义错误的时候 需使用 `into()` 方法将错误转换为 `ProgramError` 的实例。
impl From<ReviewError> for ProgramError {
    fn from(e: ReviewError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
