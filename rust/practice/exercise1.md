# **习题⼀**

## **第⼀题**

1. 使⽤ if 检查 i32 类型的变量是否为正数、负数或零，并打印相应的信息。
2. 使⽤ loop 编写⼀个⽆限循环，当循环次数达到10次时，使⽤ break 退出循环。
3. 使⽤ for 循环遍历 1 到 888 的数字，并只打印出其中的偶数。

```rust

/// 1. 使用 if 检查 i32 类型的变量是否为正数、负数或零，并打印相应的信息。
fn check_number(num: i32) {
    if num > 0 {
        println!("{} 是正数", num);
    } else if num < 0 {
        println!("{} 是负数", num);
    } else {
        println!("{} 是零", num);
    }
}

/// 2. 使用 loop 编写一个无限循环,当循环次数达到10次时,使用 break 退出循环。
fn loop_ten_times() {
    let mut count = 0;
    loop {
        count += 1;
        if count > 10 {
            break;
        }
    }
}

/// 3. 使用 for 循环遍历 1 到 888 的数字，并只打印出其中的偶数。
fn print_even_numbers() {
    for i in 1..=888 {
        if i % 2 == 0 {
            println!("{}", i);
        }
    }
}

fn main() {
    let num: i32 = 10; 
    check_number(num);
    loop_ten_times();
    print_even_numbers();
}

```



## **第⼆题**

1. 创建⼀个函数 take_onwership ，它获取⼀个 String 类型的参数，并打印出来，然后探

索函数调⽤后原变量的状态；创建⼀个函数 borrow_string ，它获取⼀个对 String 的不

可变引⽤，并打印出字符串的⻓度。

```rust
// 创建一个函数 take_onwership，它获取一个 String 类型的参数，并打印出来
fn take_ownership(s: String) {
    println!("{}", s);
    // s 在这里离开作用域并被丢弃
}

// 创建一个函数 borrow_string，它获取一个对 String 的不可变引用，并打印出字符串的长度
fn borrow_string(s: &String) {
    println!("{}", s.len());
    // s 是一个引用，所以在这里离开作用域时不会被丢弃
}

fn main() {
    let s = String::from("hello");
    take_ownership(s);
    // 此处无法再次使用 s，因为 s 的所有权已经被 take_ownership 函数获取

    let s = String::from("hello");
    borrow_string(&s);
    // 此处仍然可以使用 s，因为 s 的所有权没有被 borrow_string 函数获取
}
```



2. 分别写出下⾯程序⽚断输出结果，并说明原因。

```rust
fn main() {
    let mut a = 10u32;
    let b = &mut a;
    *b = 20;
    let c = &a;
    println!("{b}"); // 输出：20
    // 因为 b 是 a 的可变引用，所以可以通过解引用操作（*b）来改变 a 的值。当我们打印 b 时，实际上打印的是 a 的值。
}

fn main() {
    let mut a = 10u32;
    let b = &mut a;
    *b = 20;
    let c = &a;
    println!("{c}"); // 输出：20
    // 同样，因为 b 是 a 的可变引用，所以可以通过解引用操作（*b）来改变 a 的值。当我们打印 c 时，实际上打印的是 a 的值。
}

fn main() {
    let mut a = 10u32;
    let c = &a;
    let b = &mut a;
    *b = 20;
    println!("{c}"); // 这段代码会编译失败
    // 因为在同一作用域中，Rust 不允许同时存在可变引用和不可变引用。在这里，b 是 a 的可变引用，c 是 a 的不可变引用，所以会导致编译错误。
}

```



## **第三题**

1. 假设有⼀个结构体 Person ，它包含⼀个对 String 的引⽤。编写⼀个带有⽣命周期注释的结构体，并解释为什么需要⽣命周期。

   ```rust
   struct Person<'a> {
       name: &'a String,
   }
   ```

   > 在 Rust 中，当我们在结构体中使用引用时，我们需要使用生命周期注解。生命周期注解是一种告诉 Rust 编译器引用的有效期的方式，这样编译器就可以防止悬垂引用的出现.
   >
   > 在这个例子中，`'a` 是一个生命周期参数，它告诉 Rust `name` 字段的引用不能比 `'a` 生命周期更长。这样，Rust 就可以确保 `Person` 结构体实例在其 `name` 字段所引用的字符串被丢弃之前都是有效的。

2. 实现⼀个返回最⻓字符串切⽚的函数编写⼀个函数 longest ， 它接受两个字符的引⽤，并返回最⻓的字符串的引⽤。尝试调⽤longest 函数，并处理可能出现的⽣命周期问题。

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string is long");
    let string2 = String::from("xyz");
    let result = longest(string1.as_str(), string2.as_str());
    println!("The longest string is {}", result);
}

```

> 在这个例子中，`longest` 函数的签名中的 `'a` 表示函数的输入和输出必须有相同的生命周期。这样，Rust 就可以确保返回的引用在其引用的值被丢弃之前都是有效的。在 `main` 函数中，我们创建了两个字符串，并调用了 `longest` 函数。由于 `string1` 和 `string2` 的生命周期都超过了 `longest` 函数的返回值，所以这段代码是安全的。如果尝试在 `longest` 函数返回后丢弃 `string1` 或 `string2`，Rust 编译器将会报错，因为这会导致悬垂引用。这就是生命周期在 Rust 中的作用。它们帮助我们编写安全的代码，防止出现悬垂引用等问题。





## 第四题

1. 请定义⼀个 Person 结构体，它应该包括 姓名、年龄和城市 等字段。然后编写⼀个关联函数new ，⽤于根据给定的参数创建 Person 实例。

2. 为 Person 结构体实现⼀个⽅法 introduce ，该⽅法的作⽤是打印出⼀个介绍个⼈信息的语句。应能够清晰地表达出这个⼈的姓名、年龄和所在的城市

```rust
// 定义 Person 结构体
struct Person {
    name: String,
    age: u8,
    city: String,
}

impl Person {
    // 定义关联函数 new
    fn new(name: String, age: u8, city: String) -> Person {
        Person { name, age, city }
    }

    // 定义方法 introduce
    fn introduce(&self) {
        println!("我叫{}，我{}岁，我来自{}", self.name, self.age, self.city);
    }
}

fn main() {
    // 使用关联函数 new 创建 Person 实例
    let person = Person::new(String::from("张三"), 30, String::from("北京"));

    // 调用 introduce 方法
    person.introduce();
}

```

>有self出现的用`::`的方式调用 无self出现就用`.`

## **第五题**

定义⼀个名为 TrafficLight 的枚举，它应该包含红灯、⻩灯、绿灯这三种状态。然后为TrafficLight 枚举实现⼀个⽅法 duration ，该⽅法返回每种灯持续的时间（以秒为单位）。最后，使⽤ match 表达式来处理 TrafficLight 实例，根据不同的灯显示相应的⾏动指

示。

```rust
// 定义 TrafficLight 枚举
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

impl TrafficLight {
    // 为 TrafficLight 实现 duration 方法
    fn duration(&self) -> u32 {
        match self {
            TrafficLight::Red => 60,    // 红灯持续60秒
            TrafficLight::Yellow => 10, // 黄灯持续10秒
            TrafficLight::Green => 30,  // 绿灯持续30秒
        }
    }

    // 使用 match 表达式处理 TrafficLight 实例
    fn action(&self) {
        match self {
            TrafficLight::Red => println!("停！"),
            TrafficLight::Yellow => println!("等一等！"),
            TrafficLight::Green => println!("走！"),
        }
    }
}

fn main() {
    let red = TrafficLight::Red;
    println!("红灯持续 {} 秒", red.duration());
    red.action();

    let yellow = TrafficLight::Yellow;
    println!("黄灯持续 {} 秒", yellow.duration());
    yellow.action();

    let green = TrafficLight::Green;
    println!("绿灯持续 {} 秒", green.duration());
    green.action();
}

```

> 这里搞清楚[self、&self 和 &mut self](https://course.rs/basic/method.html#selfself-和-mut-self)的区别就行了