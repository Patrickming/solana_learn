# 习题二

## 第一题

1. 创建⼀个泛型函数 print_info ，它接受⼀个实现了 Debug 特征的参数，并打印出该参数 的调试信息。这个函数应该能够处理任何实现了 Debug 特征的类型。

   ```rust
   use std::fmt::Debug;
   
   fn print_info<T: Debug>(item: T) {
       println!("{:?}", item);
   }
   
   fn main() {
       print_info("Hello, world!");
       print_info(42);
       print_info(vec![1, 2, 3]);
   }
   
   ```

   > 在Rust中，许多类型都实现了`Debug`特性。以下是一些例子：
   >
   > 1. 基本类型：如`i32`，`f64`，`bool`等。
   > 2. [引用和原始指针：如`&T`，`&mut T`，`*const T`，`*mut T`](https://rustwiki.org/en/reference/special-types-and-traits.html)。
   > 3. [数组和切片：如`[T; n\]`和`[T]`](https://rustwiki.org/en/reference/special-types-and-traits.html)。
   > 4. [函数项类型和函数指针](https://rustwiki.org/en/reference/special-types-and-traits.html)
   > 5. [结构体，枚举，联合体和元组：只要它们的所有字段都实现了`Debug`特性](https://rustwiki.org/en/reference/special-types-and-traits.html)

2. 创建⼀个泛型函数 largest ，它接受⼀个任意类型的切⽚，并返回切⽚中最⼤的元素。要求这个函数只能⽤于元素类型实现了 PartialOrd 和 Copy 特征的情况。

   ````rust
   fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
       let mut largest = list[0];
   
       for &item in list.iter() {
           if item > largest {
               largest = item;
           }
       }
   
       largest
   }
   
   fn main() {
       let numbers = vec![34, 50, 25, 100, 65];
       let result = largest(&numbers);
       println!("The largest number is {}", result);
   }
   
   ````





## 第二题

1. 定义⼀个名为 Drawable 的特征，它包含⼀个名为 draw 的⽅法。然后定义两个结构体Circle 和 Square ，并为它们实现 Drawable 特征。

2. 创建⼀个名为 display 的函数，它接受⼀个实现了 Drawable 特征的参数。在这个函数内部，调⽤传⼊参数的 draw ⽅法。

```rust
// 定义 Drawable 特征
trait Drawable {
    fn draw(&self);
}

// 定义 Circle 结构体并实现 Drawable 特征
struct Circle {
    radius: f32,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing a circle with radius {}", self.radius);
    }
}

// 定义 Square 结构体并实现 Drawable 特征
struct Square {
    side: f32,
}

impl Drawable for Square {
    fn draw(&self) {
        println!("Drawing a square with side {}", self.side);
    }
}

// 定义 display 函数
fn display(drawable: &dyn Drawable) {
    drawable.draw();
}

fn main() {
    let circle = Circle { radius: 10.0 };
    let square = Square { side: 5.0 };

    display(&circle);
    display(&square);
}

```

> 展示了 Rust 中特征和动态分发的使用。

## 第三题

⽤ Rust 写⼀个冒泡排序函数，要求⽀持范型，并⽀持指定按 升序 、 降序 。

```rust
fn bubble_sort<T: Ord>(values: &mut [T], ascending: bool) {
    let mut n = values.len();
    let mut swapped;
    loop {
        swapped = false;
        for i in 1..n {
            if (ascending && values[i - 1] > values[i]) || (!ascending && values[i - 1] < values[i]) {
                values.swap(i - 1, i);
                swapped = true;
            }
        }
        n = n - 1;
        if !swapped {
            break;
        }
    }
}

fn main() {
    let mut numbers = vec![8, 7, 6, 5, 4, 3, 2, 1];
    println!("Original: {:?}", numbers);
    bubble_sort(&mut numbers, true);
    println!("Ascending: {:?}", numbers);
    bubble_sort(&mut numbers, false);
    println!("Descending: {:?}", numbers);
}

```

> 在这段代码中，`bubble_sort` 函数接受一个可变引用到一个切片和一个布尔值。切片中的元素类型 `T` 必须实现 `Ord` trait，这样我们才能对它们进行比较。布尔值 `ascending` 决定了排序的方向：如果 `ascending` 为 `true`，则进行升序排序；如果 `ascending` 为 `false`，则进行降序排序。
>
> 在 `main` 函数中，我们创建了一个包含数字的向量，并使用 `bubble_sort` 函数对其进行了升序和降序排序。



## 第四题

1. 设计⼀个名为 divide 的函数，它接受两个 f64 类型的参数，返回类型为 Result<f64,String> 。当除数为零时，函数应返回⼀个描述错误的字符串。

2. 设计⼀个名为 get_first 的函数，它接受⼀个 Vec<i32> 并返回⼀个 Option<i32> ，如果向量为空，则返回 None 。

3. 对于上⾯这个函数，编写代码示例，展示如何使⽤ match 表达式来处理 divide 和get_first 函数的返回值。进⼀步，展示如何使⽤ map、and_then、or_else 等组合操作符来优化处理 Option 和 Result 的代码。

```rust
fn divide(x: f64, y: f64) -> Result<f64, String> {
    if y == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(x / y)
    }
}
fn get_first(v: Vec<i32>) -> Option<i32> {
    v.first().cloned()
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("10 divided by 2 is {}", result),
        Err(err) => println!("Error: {}", err),
    }

    let v = vec![1, 2, 3];
    match get_first(v) {
        Some(first) => println!("The first element is {}", first),
        None => println!("The vector is empty"),
    }
}

```



## 第五题

编写⼀个函数，它尝试执⾏多个可能失败的操作，并返回⼀个错误类型为 Box<dyn Error> 的Result 。展示如何在⼀个函数中处理不同类型的错误，并返回统⼀的错误类型。

```rust
use std::error::Error;
use std::fs::File;
use std::io::Read;

fn read_file_contents(path: &str) -> Result<String, Box<dyn Error>> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    Ok(contents)
}

fn main() {
    match read_file_contents("path/to/file") {
        Ok(contents) => println!("File contents: {}", contents),
        Err(err) => println!("Failed to read file: {}", err),
    }
}

```

> 在这个例子中，`read_file_contents` 函数尝试打开一个文件并读取其内容。这两个操作都可能失败：`File::open` 可能会因为文件不存在而返回 `std::io::Error`，`read_to_string` 可能会因为读取错误而返回 `std::io::Error`。我们使用 `?` 运算符来立即返回错误结果。由于 `?` 运算符会自动将错误转换为函数返回类型所期望的错误类型，所以这些 `std::io::Error` 实例会被自动转换为 `Box<dyn Error>`。
>
> 在 `main` 函数中，我们使用 `match` 表达式来处理 `read_file_contents` 函数的返回值。如果函数成功返回，我们打印出文件的内容；如果函数返回错误，我们打印出错误信息。这就是如何在一个函数中处理不同类型的错误，并返回统一的错误类型。