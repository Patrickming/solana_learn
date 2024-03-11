use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    program_pack::{IsInitialized, Sealed},
    pubkey::Pubkey,
};

//电影账户
#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieAccountState {
    pub discriminator: String, //用于从客户端获取我们需要的账户类型。在获取程序账户时过滤账户。
    pub is_initialized: bool,
    pub reviewer: Pubkey,
    pub rating: u8,
    pub title: String,
    pub description: String,
}

//电影评论计数器账户
#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieCommentCounter {
    pub discriminator: String,
    pub is_initialized: bool,
    pub counter: u64,
}

//电影评论账户
#[derive(BorshSerialize, BorshDeserialize)]
pub struct MovieComment {
    pub discriminator: String,
    pub is_initialized: bool,
    pub review: Pubkey,
    pub commenter: Pubkey,
    pub comment: String,
    pub count: u64,
}

//`Sealed` 是 Solana 版的 Rust 的 `Sized` 特征。是指定 `MovieAccountState` 有一个已知的大小，并提供了一些编译器优化。
impl Sealed for MovieAccountState {}

//对于我们的电影评论，我们希望能够检查一个账户是否已经初始化。为此，我们创建了一个 `is_initialized` 函数，该函数检查 `MovieAccountState` 结构中的 `is_initialized` 字段。
impl IsInitialized for MovieAccountState {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl IsInitialized for MovieCommentCounter {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl IsInitialized for MovieComment {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

//因为我们向现有的结构体添加了一个新的 `discriminator` 字段，所以账户大小计算需要进行更改。
//三个结构体中的每一个添加一个常量 `DISCRIMINATOR` 和一个常量 `SIZE` 或函数 `get_account_size` 的实现，这样我们在初始化账户时可以快速获取所需的大小。
//对于动态数据，比如字符串，Borsh 在开头会额外添加 4 字节来存储该特定字段的长度。
impl MovieAccountState {
    pub const DISCRIMINATOR: &'static str = "review";

    pub fn get_account_size(title: String, description: String) -> usize {
        return (4 + MovieAccountState::DISCRIMINATOR.len())
            + 1
            + 1
            + (4 + title.len())
            + (4 + description.len());
    }
}

impl MovieCommentCounter {
    pub const DISCRIMINATOR: &'static str = "counter";
    pub const SIZE: usize = (4 + MovieCommentCounter::DISCRIMINATOR.len()) + 1 + 8;
}

impl MovieComment {
    pub const DISCRIMINATOR: &'static str = "comment";

    pub fn get_account_size(comment: String) -> usize {
        return (4 + MovieComment::DISCRIMINATOR.len()) + 1 + 32 + 32 + (4 + comment.len()) + 8;
    }
}
