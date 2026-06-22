# Lecture 8 - Banded Matrices, Vector Norms

> [!info] Lecture Overview
> Topics:
>
> - Banded matrices
> - Bandwidth
> - Complexity savings for banded matrices
> - Vector norms
> - Norm properties
> - Euclidean norm
> - Manhattan norm
> - General $p$-norms
> - Infinity norm
> - Matrix-induced vector norms
> - Unit circles / unit spheres for different norms

---

# Banded Matrices

## Motivation

> [!note] Another Special Class of Matrices
> In applications, the type of matrix used to solve
>
> $$
> Ax=b
> $$
>
> is often special.
>
> One important special class is:
>
> $$
> \text{banded matrices}.
> $$

> [!example] Where Banded Matrices Appear
> Banded matrices often appear in discretizations of ODEs.
>
> For example, consider an ODE like
>
> $$
> y''(x)-2y'(x)+3y(x)=4,
> $$
>
> with
>
> $$
> x\in[0,1],
> \qquad
> y(0)=2,
> \qquad
> y(1)=10.
> $$
>
> After discretization, the resulting matrix is often banded.

---

## Example of a Banded Matrix

> [!example] Example
> A typical banded matrix can look like
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & 0 & 0\\
> a_{21} & a_{22} & a_{23} & a_{24} & 0\\
> 0 & a_{32} & a_{33} & a_{34} & a_{35}\\
> 0 & 0 & a_{43} & a_{44} & a_{45}\\
> 0 & 0 & 0 & a_{54} & a_{55}
> \end{bmatrix}.
> $$
>
> The nonzero entries are concentrated near the diagonal.
>
> Entries far away from the diagonal are zero.

> [!tip] Meaning
> A banded matrix is not just any sparse matrix.
>
> Its nonzero entries must appear in a band around the main diagonal.

---

# Definition of Banded Matrix

> [!note] Definition: Banded Matrix
> An
>
> $$
> n\times n
> $$
>
> matrix $A$ is **banded** if there exist integers
>
> $$
> 1\le s,t\le n
> $$
>
> such that
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } j-i\ge t+1,
> $$
>
> and
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } i-j\ge s+1.
> $$

> [!note] Meaning of $t$ and $s$
> The matrix has:
>
> $$
> t
> $$
>
> nonzero upper diagonals,
>
> and
>
> $$
> s
> $$
>
> nonzero lower diagonals.
>
> The total bandwidth is
>
> $$
> t+s+1.
> $$
>
> The extra $1$ counts the main diagonal.

> [!tip] Interpretation
> The condition
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } j-i\ge t+1
> $$
>
> means entries too far above the diagonal are zero.
>
> The condition
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } i-j\ge s+1
> $$
>
> means entries too far below the diagonal are zero.

---

# Complexity for Banded Matrices

## Question

> [!question] How Fast Are PLU / Cholesky on Banded Matrices?
> For a dense matrix, LU / PLU costs about
>
> $$
> \frac23n^3.
> $$
>
> Cholesky costs about
>
> $$
> \frac13n^3.
> $$
>
> But for banded matrices, most entries are zero, so the algorithms can be much
> faster.

---

## Loop Structure

> [!note] Dense Matrix Loop
> Dense matrix algorithms usually have nested loops like:
>
> ```text
> for i = 1:n
>     for j = i+1:n
>         for k = i+1:n
>             ...
>         end
>     end
> end
> ```
>
> This creates cubic complexity:
>
> $$
> O(n^3).
> $$

> [!note] Banded Matrix Loop
> If $A$ is banded, then we do not need to loop over all rows and columns.
>
> For each column, we only update entries inside the band.
>
> So the loops become approximately:
>
> ```text
> for i = 1:n
>     for j = i+1 : i+s
>         for k = i+1 : i+t
>             ...
>         end
>     end
> end
> ```
>
> Here $s$ and $t$ are the lower and upper bandwidths.

---

## Complexity

> [!success]- Flop Count Idea
> For each column $i$, the number of rows below the pivot that need updates is
> about
>
> $$
> s.
> $$
>
> For each such row, the number of columns that need updates is about
>
> $$
> t.
> $$
>
> Therefore, for each column, the work is about
>
> $$
> O(st).
> $$
>
> Since there are
>
> $$
> n
> $$
>
> columns, the total cost is about
>
> $$
> O(stn).
> $$
>
> If
>
> $$
> s,t=O(1),
> $$
>
> meaning $s$ and $t$ are constants while $n$ is large, then
>
> $$
> O(stn)=O(n).
> $$
>
> So the banded algorithm is linear in $n$.

> [!abstract] Main Result
> For dense LU:
>
> $$
> \text{cost}\approx \frac23n^3.
> $$
>
> For banded LU:
>
> $$
> \text{cost}=O(stn).
> $$
>
> If $s,t$ are small constants, then
>
> $$
> \text{cost}=O(n).
> $$

> [!tip] Remark
> This is a huge saving compared to the non-banded case.

---

# Vector Norms

## Motivation

> [!note] Why Norms?
> In this class, we need a way to understand distances between:
>
> - two vectors
> - two matrices
>
> Norms give us this.

> [!tip] Distance from Norm
> A norm can be used to define distance:
>
> $$
> d(x,y)=\|x-y\|.
> $$
>
> So if
>
> $$
> \|x-y\|
> $$
>
> is small, then $x$ and $y$ are close.

---

# Definition of a Norm

> [!note] Definition: Vector Norm
> A norm is a function of a vector
>
> $$
> x\in\mathbb{R}^n,
> $$
>
> usually denoted
>
> $$
> \|x\|,
> $$
>
> which takes real nonnegative values and satisfies the following properties.

---

## Norm Properties

> [!abstract] Property 1: Positivity
> For every nonzero vector
>
> $$
> x\ne 0,
> $$
>
> we have
>
> $$
> \|x\|>0.
> $$
>
> Also,
>
> $$
> \|0\|=0.
> $$

> [!abstract] Property 2: Multiplication by Constant
> For every scalar
>
> $$
> c\in\mathbb{R},
> $$
>
> and every vector
>
> $$
> x\in\mathbb{R}^n,
> $$
>
> we have
>
> $$
> \|cx\|=|c|\|x\|.
> $$

> [!abstract] Property 3: Triangle Inequality
> For every pair of vectors
>
> $$
> x,y\in\mathbb{R}^n,
> $$
>
> we have
>
> $$
> \|x+y\|\le \|x\|+\|y\|.
> $$

---

# Euclidean Norm

## Definition

> [!note] Euclidean Norm / $2$-Norm
> For
>
> $$
> x=
> \begin{bmatrix}
> x_1\\
> x_2\\
> \vdots\\
> x_n
> \end{bmatrix},
> $$
>
> the Euclidean norm is
>
> $$
> \|x\|_2
> =
> \sqrt{x_1^2+x_2^2+\cdots+x_n^2}.
> $$
>
> Equivalently,
>
> $$
> \|x\|_2
> =
> \sqrt{\sum_{i=1}^n x_i^2}.
> $$

> [!tip] Meaning
> The Euclidean norm gives the usual Euclidean distance.
>
> In particular,
>
> $$
> d(x,y)=\|x-y\|_2.
> $$

---

## Checking That $\|\cdot\|_2$ Is a Norm

> [!success]- Check the Norm Properties
> **Positivity.**
>
> Since
>
> $$
> \|x\|_2
> =
> \sqrt{x_1^2+x_2^2+\cdots+x_n^2},
> $$
>
> every term
>
> $$
> x_i^2
> $$
>
> is nonnegative.
>
> Therefore,
>
> $$
> \|x\|_2\ge 0.
> $$
>
> Also,
>
> $$
> \|x\|_2=0
> $$
>
> means
>
> $$
> x_1^2+x_2^2+\cdots+x_n^2=0.
> $$
>
> Since every term is nonnegative, this can happen only if
>
> $$
> x_1=x_2=\cdots=x_n=0.
> $$
>
> Thus
>
> $$
> x=0.
> $$
>
> Therefore,
>
> $$
> \|x\|_2>0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> **Multiplication by a constant.**
>
> Let
>
> $$
> c\in\mathbb{R}.
> $$
>
> Then
>
> $$
> \|cx\|_2
> =
> \sqrt{(cx_1)^2+(cx_2)^2+\cdots+(cx_n)^2}.
> $$
>
> This becomes
>
> $$
> \|cx\|_2
> =
> \sqrt{c^2x_1^2+c^2x_2^2+\cdots+c^2x_n^2}.
> $$
>
> Factor out
>
> $$
> c^2:
> $$
>
> $$
> \|cx\|_2
> =
> \sqrt{
> c^2(x_1^2+x_2^2+\cdots+x_n^2)
> }.
> $$
>
> Since
>
> $$
> \sqrt{c^2}=|c|,
> $$
>
> we get
>
> $$
> \|cx\|_2
> =
> |c|
> \sqrt{x_1^2+x_2^2+\cdots+x_n^2}.
> $$
>
> Therefore,
>
> $$
> \|cx\|_2=|c|\|x\|_2.
> $$
>
> **Triangle inequality.**
>
> For the Euclidean norm,
>
> $$
> \|x+y\|_2\le \|x\|_2+\|y\|_2.
> $$
>
> Geometrically, this says that the length of one side of a triangle is at most
> the sum of the lengths of the other two sides.
>
> In the picture from the notes:
>
> $$
> \|x\|_2+\|y\|_2\ge \|x+y\|_2.
> $$

---

# Manhattan Norm

## Definition

> [!note] Manhattan Norm / $1$-Norm
> The Manhattan norm, also called the $1$-norm, is
>
> $$
> \|x\|_1
> =
> |x_1|+|x_2|+\cdots+|x_n|.
> $$
>
> Equivalently,
>
> $$
> \|x\|_1
> =
> \sum_{i=1}^n |x_i|.
> $$

> [!tip] Meaning
> In two dimensions, this measures distance by moving along grid lines.
>
> This is why it is also called the **taxicab norm**.

---

## Checking That $\|\cdot\|_1$ Is a Norm

> [!success]- Check the Norm Properties
> **Positivity.**
>
> Since
>
> $$
> |x_i|\ge 0
> $$
>
> for every $i$, we have
>
> $$
> \sum_{i=1}^n |x_i|\ge 0.
> $$
>
> Also,
>
> $$
> \sum_{i=1}^n |x_i|=0
> $$
>
> only if
>
> $$
> |x_i|=0
> \qquad
> \text{for every } i.
> $$
>
> That means
>
> $$
> x_i=0
> \qquad
> \text{for every } i.
> $$
>
> Therefore,
>
> $$
> x=0.
> $$
>
> So
>
> $$
> \|x\|_1>0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> **Multiplication by a constant.**
>
> Let
>
> $$
> c\in\mathbb{R}.
> $$
>
> Then
>
> $$
> \|cx\|_1
> =
> \sum_{i=1}^n |cx_i|.
> $$
>
> Since
>
> $$
> |cx_i|=|c||x_i|,
> $$
>
> we get
>
> $$
> \|cx\|_1
> =
> \sum_{i=1}^n |c||x_i|.
> $$
>
> Since $|c|$ is constant,
>
> $$
> \|cx\|_1
> =
> |c|\sum_{i=1}^n |x_i|.
> $$
>
> Therefore,
>
> $$
> \|cx\|_1=|c|\|x\|_1.
> $$
>
> **Triangle inequality.**
>
> We use the scalar inequality
>
> $$
> |a+b|\le |a|+|b|.
> $$
>
> Then
>
> $$
> \|x+y\|_1
> =
> \sum_{i=1}^n |x_i+y_i|.
> $$
>
> By the scalar triangle inequality,
>
> $$
> |x_i+y_i|\le |x_i|+|y_i|.
> $$
>
> Therefore,
>
> $$
> \|x+y\|_1
> \le
> \sum_{i=1}^n (|x_i|+|y_i|).
> $$
>
> Split the sum:
>
> $$
> \|x+y\|_1
> \le
> \sum_{i=1}^n |x_i|
> +
> \sum_{i=1}^n |y_i|.
> $$
>
> Hence,
>
> $$
> \|x+y\|_1
> \le
> \|x\|_1+\|y\|_1.
> $$

---

# General $p$-Norms

## Definition

> [!note] $p$-Norm
> For
>
> $$
> p\in\mathbb{R},
> \qquad p\ge 1,
> $$
>
> the $p$-norm is
>
> $$
> \|x\|_p
> =
> \left(
> |x_1|^p+|x_2|^p+\cdots+|x_n|^p
> \right)^{1/p}.
> $$
>
> Equivalently,
>
> $$
> \|x\|_p
> =
> \left(
> \sum_{i=1}^n |x_i|^p
> \right)^{1/p}.
> $$

> [!example] Special Cases
> When
>
> $$
> p=1,
> $$
>
> we get the Manhattan norm:
>
> $$
> \|x\|_1
> =
> |x_1|+\cdots+|x_n|.
> $$
>
> When
>
> $$
> p=2,
> $$
>
> we get the Euclidean norm:
>
> $$
> \|x\|_2
> =
> \sqrt{x_1^2+\cdots+x_n^2}.
> $$

---

# Infinity Norm

> [!note] Infinity Norm
> The infinity norm is
>
> $$
> \|x\|_\infty
> =
> \max_i |x_i|.
> $$

> [!example] Example
> If
>
> $$
> x=
> \begin{bmatrix}
> -3\\
> 2\\
> 5\\
> -1
> \end{bmatrix},
> $$
>
> then
>
> $$
> \|x\|_\infty
> =
> \max\{|-3|,|2|,|5|,|-1|\}
> =
> 5.
> $$

---

# Matrix-Induced Vector Norm

> [!note] Matrix-Induced Vector Norm
> If $A$ is an invertible matrix and
>
> $$
> \|x\|
> $$
>
> is a norm, then
>
> $$
> \|x\|_A=\|Ax\|
> $$
>
> is also a norm.

> [!tip] Meaning
> This norm first transforms the vector by $A$, then measures the transformed
> vector using the original norm.
>
> Since $A$ is invertible, the transformation does not collapse any nonzero
> vector to zero.

---

# Unit Circle / Unit Sphere for a Norm

## Definition

> [!note] Unit Circle / Unit Sphere
> For a norm
>
> $$
> \|\cdot\|,
> $$
>
> the unit circle or unit sphere is
>
> $$
> B_{\|\cdot\|}(0,1)
> =
> \{x\in\mathbb{R}^n:\|x\|=1\}.
> $$

> [!tip] In Two Dimensions
> When
>
> $$
> n=2,
> $$
>
> this set is a curve in the plane.
>
> Different norms give different shapes.

---

## Shapes for Different Norms

> [!example] Unit Spheres for $n=2$
> The notes show the shapes of the unit disk / sphere for different $p$-norms:
>
> - $p=1$: diamond shape
> - $p=2$: circle
> - $p=\infty$: square
> - large $p$, such as $p=100$: close to the square shape
>
> In formulas:
>
> $$
> \|x\|_1=1
> $$
>
> gives a diamond,
>
> $$
> \|x\|_2=1
> $$
>
> gives a circle,
>
> and
>
> $$
> \|x\|_\infty=1
> $$
>
> gives a square.

> [!note] Explicit Forms in $\mathbb{R}^2$
> If
>
> $$
> x=
> \begin{bmatrix}
> x_1\\
> x_2
> \end{bmatrix},
> $$
>
> then:
>
> $$
> \|x\|_1=|x_1|+|x_2|=1,
> $$
>
> $$
> \|x\|_2=\sqrt{x_1^2+x_2^2}=1,
> $$
>
> $$
> \|x\|_\infty=\max\{|x_1|,|x_2|\}=1.
> $$

---

# Summary

> [!summary] Banded Matrices
> A banded matrix has zeros far from the diagonal.
>
> If it has $t$ nonzero upper diagonals and $s$ nonzero lower diagonals, then
> its bandwidth is
>
> $$
> t+s+1.
> $$

> [!summary] Banded Complexity
> Dense LU costs about
>
> $$
> \frac23n^3.
> $$
>
> Banded LU costs about
>
> $$
> O(stn).
> $$
>
> If $s,t=O(1)$, this becomes
>
> $$
> O(n).
> $$

> [!summary] Vector Norm
> A vector norm is a nonnegative function satisfying:
>
> $$
> \|x\|>0
> \quad \text{for } x\ne 0,
> $$
>
> $$
> \|cx\|=|c|\|x\|,
> $$
>
> and
>
> $$
> \|x+y\|\le \|x\|+\|y\|.
> $$

> [!summary] Common Norms
> $$
> \|x\|_1=\sum_{i=1}^n |x_i|,
> $$
>
> $$
> \|x\|_2=\sqrt{\sum_{i=1}^n x_i^2},
> $$
>
> $$
> \|x\|_p=
> \left(
> \sum_{i=1}^n |x_i|^p
> \right)^{1/p},
> $$
>
> $$
> \|x\|_\infty=\max_i |x_i|.
> $$

---

