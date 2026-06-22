# Lecture 9 - Matrix Norms, Condition Numbers

> [!info] Lecture Overview
> Topics:
>
> - Matrix norms
> - Frobenius norm
> - Induced matrix norms
> - Submultiplicativity
> - Examples of induced matrix norms
> - $1$-norm matrix norm
> - $\infty$-norm matrix norm
> - $2$-norm matrix norm
> - Important properties of induced norms
> - Why Frobenius norm is not induced
> - Condition number
> - Example of condition number
> - Condition number is always at least $1$

---

# Matrix Norms

## Definition

> [!note] Definition: Matrix Norm
> A matrix norm is a function
>
> $$
> \|\cdot\|:\mathbb{R}^{m\times n}\to [0,\infty)
> $$
>
> satisfying the following properties.

---

## Matrix Norm Properties

> [!abstract] Property 1: Positivity
> For every nonzero matrix
>
> $$
> A\ne 0,
> $$
>
> we have
>
> $$
> \|A\|>0.
> $$
>
> Also,
>
> $$
> \|0\|=0.
> $$

> [!abstract] Property 2: Multiplication by a Constant
> For every scalar
>
> $$
> c\in\mathbb{R}
> $$
>
> and every matrix
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> we have
>
> $$
> \|cA\|=|c|\|A\|.
> $$

> [!abstract] Property 3: Triangle Inequality
> For every pair of matrices
>
> $$
> A,B\in\mathbb{R}^{m\times n},
> $$
>
> we have
>
> $$
> \|A+B\|\le \|A\|+\|B\|.
> $$

> [!tip] Meaning
> Matrix norms extend the idea of distance from vectors to matrices.
>
> For example, a distance between two matrices can be defined by
>
> $$
> d(A,B)=\|A-B\|.
> $$

---

# Frobenius Norm

## Definition

> [!note] Frobenius Norm
> For
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> the Frobenius norm is
>
> $$
> \|A\|_F
> =
> \sqrt{
> \sum_{i=1}^{m}\sum_{j=1}^{n}a_{ij}^2
> }.
> $$
>
> Equivalently,
>
> $$
> \|A\|_F
> =
> \sqrt{\operatorname{trace}(A^TA)}.
> $$

---

## Explicit Matrix Form

> [!note] Example Matrix
> If
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & \cdots & a_{1n}\\
> a_{21} & a_{22} & \cdots & a_{2n}\\
> \vdots & \vdots & \ddots & \vdots\\
> a_{m1} & a_{m2} & \cdots & a_{mn}
> \end{bmatrix},
> $$
>
> then
>
> $$
> \|A\|_F
> =
> \sqrt{
> a_{11}^2+a_{12}^2+\cdots+a_{1n}^2
> +a_{21}^2+\cdots+a_{mn}^2
> }.
> $$

---

## Trace

> [!note] Trace
> For a square matrix
>
> $$
> X\in\mathbb{R}^{n\times n},
> $$
>
> the trace is
>
> $$
> \operatorname{trace}(X)=\sum_{i=1}^{n}x_{ii}.
> $$
>
> So the trace is the sum of the diagonal entries.

> [!example] Example
> If
>
> $$
> X=
> \begin{bmatrix}
> x_{11} & x_{12} & x_{13}\\
> x_{21} & x_{22} & x_{23}\\
> x_{31} & x_{32} & x_{33}
> \end{bmatrix},
> $$
>
> then
>
> $$
> \operatorname{trace}(X)=x_{11}+x_{22}+x_{33}.
> $$

---

# Induced Matrix Norms

## Motivation

> [!note] Main Norms We Use
> In this class, we mostly work with:
>
> - Frobenius norm
> - induced matrix norms

---

## Definition

> [!note] Definition: Induced Matrix Norm
> Let
>
> $$
> \|\cdot\|
> $$
>
> denote a vector norm on both
>
> $$
> \mathbb{R}^n
> $$
>
> and
>
> $$
> \mathbb{R}^m.
> $$
>
> For
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> the induced matrix norm is
>
> $$
> \|A\|
> =
> \max_{x\in\mathbb{R}^n,\ x\ne 0}
> \frac{\|Ax\|}{\|x\|}.
> $$

> [!tip] Meaning
> The induced norm measures the largest possible stretching factor of $A$.
>
> It asks:
>
> $$
> \text{How large can } \frac{\|Ax\|}{\|x\|} \text{ become?}
> $$

---

## Example: Induced $2$-Norm

> [!example] Example
> If
>
> $$
> A\in\mathbb{R}^{3\times 2},
> $$
>
> then the induced $2$-norm is
>
> $$
> \|A\|_2
> =
> \max_{x\in\mathbb{R}^2,\ x\ne 0}
> \frac{\|Ax\|_2}{\|x\|_2}.
> $$
>
> Here
>
> $$
> A:\mathbb{R}^2\to\mathbb{R}^3.
> $$
>
> We will understand this better later using singular values.

---

# Induced Norm is a Matrix Norm

## Proposition

> [!abstract] Proposition
> An induced matrix norm is indeed a matrix norm.
>
> It also satisfies **submultiplicativity**:
>
> $$
> \|AB\|\le \|A\|\|B\|.
> $$
>
> Here
>
> $$
> A\in\mathbb{R}^{m\times n},
> \qquad
> B\in\mathbb{R}^{n\times p}.
> $$

---

## Proof of Norm Properties

> [!success]- Proof
> We prove the matrix norm properties for
>
> $$
> \|A\|
> =
> \max_{x\ne 0}
> \frac{\|Ax\|}{\|x\|}.
> $$
>
> **Positivity.**
>
> Since the vector norm satisfies
>
> $$
> \|Ax\|\ge 0,
> \qquad
> \|x\|>0
> \quad \text{for } x\ne 0,
> $$
>
> every ratio
>
> $$
> \frac{\|Ax\|}{\|x\|}
> $$
>
> is nonnegative.
>
> Therefore,
>
> $$
> \|A\|\ge 0.
> $$
>
> If
>
> $$
> \|A\|=0,
> $$
>
> then every ratio must be zero:
>
> $$
> \frac{\|Ax\|}{\|x\|}=0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> Since
>
> $$
> \|x\|>0,
> $$
>
> this means
>
> $$
> \|Ax\|=0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> Since $\|\cdot\|$ is a vector norm,
>
> $$
> \|Ax\|=0
> \Longrightarrow
> Ax=0.
> $$
>
> Therefore,
>
> $$
> Ax=0
> \qquad
> \text{for all } x.
> $$
>
> Hence
>
> $$
> A=0.
> $$
>
> So if $A\ne 0$, then
>
> $$
> \|A\|>0.
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
> \|cA\|
> =
> \max_{x\ne 0}
> \frac{\|cAx\|}{\|x\|}.
> $$
>
> Since $\|\cdot\|$ is a vector norm,
>
> $$
> \|cAx\|=|c|\|Ax\|.
> $$
>
> Therefore,
>
> $$
> \|cA\|
> =
> \max_{x\ne 0}
> \frac{|c|\|Ax\|}{\|x\|}.
> $$
>
> Pull out the constant:
>
> $$
> \|cA\|
> =
> |c|
> \max_{x\ne 0}
> \frac{\|Ax\|}{\|x\|}.
> $$
>
> Hence,
>
> $$
> \|cA\|=|c|\|A\|.
> $$
>
> **Triangle inequality.**
>
> Start with
>
> $$
> \|A+B\|
> =
> \max_{x\ne 0}
> \frac{\|(A+B)x\|}{\|x\|}.
> $$
>
> Since
>
> $$
> (A+B)x=Ax+Bx,
> $$
>
> we get
>
> $$
> \|A+B\|
> =
> \max_{x\ne 0}
> \frac{\|Ax+Bx\|}{\|x\|}.
> $$
>
> Using the vector triangle inequality,
>
> $$
> \|Ax+Bx\|\le \|Ax\|+\|Bx\|.
> $$
>
> Therefore,
>
> $$
> \|A+B\|
> \le
> \max_{x\ne 0}
> \frac{\|Ax\|+\|Bx\|}{\|x\|}.
> $$
>
> Split the fraction:
>
> $$
> \|A+B\|
> \le
> \max_{x\ne 0}
> \left(
> \frac{\|Ax\|}{\|x\|}
> +
> \frac{\|Bx\|}{\|x\|}
> \right).
> $$
>
> This is bounded by
>
> $$
> \max_{x\ne 0}
> \frac{\|Ax\|}{\|x\|}
> +
> \max_{x\ne 0}
> \frac{\|Bx\|}{\|x\|}.
> $$
>
> Therefore,
>
> $$
> \|A+B\|\le \|A\|+\|B\|.
> $$

---

# Submultiplicativity

## Statement

> [!abstract] Submultiplicativity
> For induced matrix norms,
>
> $$
> \|AB\|\le \|A\|\|B\|.
> $$

---

## Proof

> [!success]- Proof
> Start from the definition:
>
> $$
> \|AB\|
> =
> \max_{x\ne 0}
> \frac{\|ABx\|}{\|x\|}.
> $$
>
> Insert the factor
>
> $$
> \|Bx\|
> $$
>
> by writing
>
> $$
> \frac{\|ABx\|}{\|x\|}
> =
> \frac{\|ABx\|}{\|Bx\|}
> \cdot
> \frac{\|Bx\|}{\|x\|},
> $$
>
> whenever
>
> $$
> Bx\ne 0.
> $$
>
> If
>
> $$
> Bx=0,
> $$
>
> then
>
> $$
> ABx=0,
> $$
>
> so that vector does not cause a problem.
>
> Let
>
> $$
> y=Bx.
> $$
>
> Then
>
> $$
> \frac{\|ABx\|}{\|Bx\|}
> =
> \frac{\|Ay\|}{\|y\|}.
> $$
>
> Since
>
> $$
> y
> $$
>
> ranges over vectors in
>
> $$
> \operatorname{Range}(B),
> $$
>
> we have
>
> $$
> \max_{y\in \operatorname{Range}(B),\ y\ne 0}
> \frac{\|Ay\|}{\|y\|}
> \le
> \max_{y\ne 0}
> \frac{\|Ay\|}{\|y\|}.
> $$
>
> Therefore,
>
> $$
> \max_{y\in \operatorname{Range}(B),\ y\ne 0}
> \frac{\|Ay\|}{\|y\|}
> \le
> \|A\|.
> $$
>
> Also,
>
> $$
> \max_{x\ne 0}
> \frac{\|Bx\|}{\|x\|}
> =
> \|B\|.
> $$
>
> Hence,
>
> $$
> \|AB\|
> \le
> \|A\|\|B\|.
> $$

---

# Examples of Induced Matrix Norms

## Induced $1$-Norm

> [!note] Definition
> The induced $1$-norm is
>
> $$
> \|A\|_1
> =
> \max_{x\in\mathbb{R}^n,\ x\ne 0}
> \frac{\|Ax\|_1}{\|x\|_1}.
> $$

> [!abstract] Equivalent Formula
> The induced $1$-norm is the maximum absolute column sum:
>
> $$
> \|A\|_1
> =
> \max_{1\le j\le n}
> \sum_{i=1}^{m}|a_{ij}|.
> $$

> [!tip] Meaning
> Add the absolute values down each column.
>
> Then take the largest column sum.

---

## Induced $\infty$-Norm

> [!note] Definition
> The induced $\infty$-norm is
>
> $$
> \|A\|_\infty
> =
> \max_{x\in\mathbb{R}^n,\ x\ne 0}
> \frac{\|Ax\|_\infty}{\|x\|_\infty}.
> $$

> [!abstract] Equivalent Formula
> The induced $\infty$-norm is the maximum absolute row sum:
>
> $$
> \|A\|_\infty
> =
> \max_{1\le i\le m}
> \sum_{j=1}^{n}|a_{ij}|.
> $$

> [!tip] Meaning
> Add the absolute values across each row.
>
> Then take the largest row sum.

---

## Induced $2$-Norm

> [!note] Definition
> The induced $2$-norm is
>
> $$
> \|A\|_2
> =
> \max_{x\in\mathbb{R}^n,\ x\ne 0}
> \frac{\|Ax\|_2}{\|x\|_2}.
> $$

> [!warning] Important
> We will understand the induced $2$-norm later using SVD.
>
> For now, remember that it is not simply the largest row sum or column sum.

---

# Properties of Induced Matrix Norms

## Proposition

> [!abstract] Proposition
> For any induced matrix norm
>
> $$
> \|\cdot\|:\mathbb{R}^{n\times n}\to [0,\infty),
> $$
>
> the following hold:
>
> $$
> \|I\|=1,
> $$
>
> and
>
> $$
> \|Ax\|\le \|A\|\|x\|
> \qquad
> \text{for all } x\in\mathbb{R}^n.
> $$

---

## Proof

> [!success]- Proof
> First prove
>
> $$
> \|I\|=1.
> $$
>
> By definition,
>
> $$
> \|I\|
> =
> \max_{x\ne 0}
> \frac{\|Ix\|}{\|x\|}.
> $$
>
> Since
>
> $$
> Ix=x,
> $$
>
> we get
>
> $$
> \|I\|
> =
> \max_{x\ne 0}
> \frac{\|x\|}{\|x\|}.
> $$
>
> Therefore,
>
> $$
> \|I\|
> =
> \max_{x\ne 0} 1
> =
> 1.
> $$
>
> Now prove
>
> $$
> \|Ax\|\le \|A\|\|x\|.
> $$
>
> By definition,
>
> $$
> \|A\|
> =
> \max_{x\ne 0}
> \frac{\|Ax\|}{\|x\|}.
> $$
>
> Therefore, for any fixed nonzero vector $x$,
>
> $$
> \frac{\|Ax\|}{\|x\|}
> \le
> \|A\|.
> $$
>
> Multiply both sides by
>
> $$
> \|x\|.
> $$
>
> Since
>
> $$
> \|x\|>0,
> $$
>
> we get
>
> $$
> \|Ax\|\le \|A\|\|x\|.
> $$
>
> If
>
> $$
> x=0,
> $$
>
> then
>
> $$
> Ax=0,
> $$
>
> so the inequality also holds:
>
> $$
> 0\le \|A\|0.
> $$
>
> Therefore,
>
> $$
> \|Ax\|\le \|A\|\|x\|
> \qquad
> \text{for all } x.
> $$

---

# Frobenius Norm Is Not Induced

## Corollary

> [!warning] Corollary
> The Frobenius norm
>
> $$
> \|\cdot\|_F
> $$
>
> is not an induced matrix norm for
>
> $$
> n>1.
> $$

---

## Proof

> [!success]- Proof
> For any induced matrix norm,
>
> $$
> \|I\|=1.
> $$
>
> But for the Frobenius norm,
>
> $$
> \|I\|_F
> =
> \sqrt{n}.
> $$
>
> To see this, write
>
> $$
> I=
> \begin{bmatrix}
> 1 & 0 & \cdots & 0\\
> 0 & 1 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & 1
> \end{bmatrix}.
> $$
>
> Then
>
> $$
> \|I\|_F
> =
> \sqrt{
> 1^2+1^2+\cdots+1^2
> }.
> $$
>
> Since there are $n$ ones on the diagonal,
>
> $$
> \|I\|_F
> =
> \sqrt{n}.
> $$
>
> If
>
> $$
> n>1,
> $$
>
> then
>
> $$
> \sqrt{n}\ne 1.
> $$
>
> Therefore, the Frobenius norm cannot be an induced norm for $n>1$.

---

# Condition Number

## Definition

> [!note] Definition: Condition Number
> The condition number corresponding to an induced matrix norm
>
> $$
> \|\cdot\|
> $$
>
> for an invertible matrix
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is
>
> $$
> \kappa(A)=\|A\|\|A^{-1}\|.
> $$

> [!tip] Notation
> If we use the induced $p$-norm, then we write
>
> $$
> \kappa_p(A)=\|A\|_p\|A^{-1}\|_p.
> $$
>
> The notes also write:
>
> $$
> \kappa_{\|\cdot\|}(A)=\|A\|\|A^{-1}\|.
> $$

---

# Example: Condition Number in $\infty$-Norm

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & -1\\
> 0 & 2
> \end{bmatrix}.
> $$
>
> Compute
>
> $$
> \kappa_{\|\cdot\|_\infty}(A)
> =
> \kappa_\infty(A).
> $$

> [!success]- Solution
> First compute
>
> $$
> \|A\|_\infty.
> $$
>
> The induced $\infty$-norm is the maximum absolute row sum.
>
> For
>
> $$
> A=
> \begin{bmatrix}
> 1 & -1\\
> 0 & 2
> \end{bmatrix},
> $$
>
> the row sums are:
>
> $$
> |1|+|-1|=2,
> $$
>
> and
>
> $$
> |0|+|2|=2.
> $$
>
> Therefore,
>
> $$
> \|A\|_\infty=2.
> $$
>
> Now compute $A^{-1}$.
>
> For a $2\times 2$ matrix
>
> $$
> \begin{bmatrix}
> a & b\\
> c & d
> \end{bmatrix},
> $$
>
> the inverse is
>
> $$
> \frac1{ad-bc}
> \begin{bmatrix}
> d & -b\\
> -c & a
> \end{bmatrix}.
> $$
>
> Here
>
> $$
> a=1,\quad b=-1,\quad c=0,\quad d=2.
> $$
>
> So
>
> $$
> ad-bc
> =
> 1(2)-(-1)(0)
> =
> 2.
> $$
>
> Hence
>
> $$
> A^{-1}
> =
> \frac12
> \begin{bmatrix}
> 2 & 1\\
> 0 & 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1 & \frac12\\
> 0 & \frac12
> \end{bmatrix}.
> $$
>
> Now compute
>
> $$
> \|A^{-1}\|_\infty.
> $$
>
> The row sums are:
>
> $$
> |1|+\left|\frac12\right|=\frac32,
> $$
>
> and
>
> $$
> |0|+\left|\frac12\right|=\frac12.
> $$
>
> Therefore,
>
> $$
> \|A^{-1}\|_\infty=\frac32.
> $$
>
> Thus,
>
> $$
> \kappa_\infty(A)
> =
> \|A\|_\infty\|A^{-1}\|_\infty.
> $$
>
> Substitute:
>
> $$
> \kappa_\infty(A)
> =
> 2\cdot \frac32
> =
> 3.
> $$
>
> Therefore,
>
> $$
> \boxed{\kappa_\infty(A)=3}.
> $$

---

# Condition Number Is at Least $1$

## Proposition

> [!abstract] Proposition
> For any induced matrix norm
>
> $$
> \|\cdot\|:\mathbb{R}^{n\times n}\to [0,\infty),
> $$
>
> and any invertible matrix
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> we have
>
> $$
> \kappa(A)\ge 1.
> $$

---

## Proof

> [!success]- Proof
> Since
>
> $$
> A
> $$
>
> is invertible,
>
> $$
> AA^{-1}=I.
> $$
>
> Take norms:
>
> $$
> \|I\|
> =
> \|AA^{-1}\|.
> $$
>
> By submultiplicativity of induced matrix norms,
>
> $$
> \|AA^{-1}\|
> \le
> \|A\|\|A^{-1}\|.
> $$
>
> Therefore,
>
> $$
> \|I\|
> \le
> \|A\|\|A^{-1}\|.
> $$
>
> For induced matrix norms,
>
> $$
> \|I\|=1.
> $$
>
> Hence,
>
> $$
> 1\le \|A\|\|A^{-1}\|.
> $$
>
> By definition,
>
> $$
> \kappa(A)=\|A\|\|A^{-1}\|.
> $$
>
> Therefore,
>
> $$
> \boxed{\kappa(A)\ge 1}.
> $$

---

