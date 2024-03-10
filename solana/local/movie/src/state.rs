use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_pack::{IsInitialized, Sealed};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieAccountState {
    pub is_initialized: bool,
    pub rating: u8,
    pub description: String,
    pub title: String,
}

//`Sealed` 是 Solana 版的 Rust 的 `Sized` 特征。是指定 `MovieAccountState` 有一个已知的大小，并提供了一些编译器优化。
impl Sealed for MovieAccountState {}

//对于我们的电影评论，我们希望能够检查一个账户是否已经初始化。为此，我们创建了一个 `is_initialized` 函数，该函数检查 `MovieAccountState` 结构中的 `is_initialized` 字段。
impl IsInitialized for MovieAccountState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}
