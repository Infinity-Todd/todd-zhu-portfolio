# Lecture 26 - The Gauss-Seidel Method

> [!info] Lecture Overview
> Topics:
>
> - Alternative to Jacobi: Gauss-Seidel method
> - Jacobi vs. Gauss-Seidel update rule
> - Gauss-Seidel example
> - Matrix form of Gauss-Seidel
> - Residual form
> - Error analysis
> - Convergence condition
> - Comparison with Jacobi

---
# Another Method: Gauss-Seidel

## Main Idea

> [!note] Idea
> Gauss-Seidel improves the Jacobi recurrence by using updated values as soon
> as they become available.
>
> Recall that for solving
>
> $$
> Ax=b,
> $$
>
> we can rearrange each equation as
>
> $$
> x_i
> =
> \frac1{a_{ii}}
> \left(
> b_i-\sum_{j\ne i}a_{ij}x_j
> \right),
> $$
>
> assuming
>
> $$
> a_{ii}\ne 0.
> $$

---

## Old Method: Jacobi

> [!note] Jacobi Update
> Jacobi updates every coordinate using only the old values from step $k$:
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}
> \right),
> $$
>
> for
>
> $$
> i=1,2,\ldots,n.
> $$

> [!tip] Meaning
> In Jacobi, when computing $x_i^{(k+1)}$, every other coordinate comes from
> the previous vector:
>
> $$
> x^{(k)}.
> $$

---

## New Method: Gauss-Seidel

> [!abstract] Gauss-Seidel Update
> Gauss-Seidel updates continuously on the go.
>
> When computing $x_i^{(k+1)}$, it uses the newest available values:
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i
> -
> \sum_{j<i}a_{ij}x_j^{(k+1)}
> -
> \sum_{j>i}a_{ij}x_j^{(k)}
> \right).
> $$
>
> Here:
>
> - for $j<i$, we already computed $x_j^{(k+1)}$
> - for $j>i$, we have not updated yet, so we still use $x_j^{(k)}$

> [!tip] Main Difference
> Jacobi waits until the whole new vector is computed.
>
> Gauss-Seidel immediately uses new entries as soon as they are computed.

---

# Example: Gauss-Seidel Method

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 4 & 1 & 3\\
> 1 & 5 & 1\\
> 2 & -1 & 8
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> 17\\
> 14\\
> 12
> \end{bmatrix}.
> $$
>
> Start with
>
> $$
> x^{(0)}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> Use Gauss-Seidel to approximate the solution.

> [!success]- Solution
> The system is
>
> $$
> \begin{bmatrix}
> 4 & 1 & 3\\
> 1 & 5 & 1\\
> 2 & -1 & 8
> \end{bmatrix}
> \begin{bmatrix}
> x_1\\
> x_2\\
> x_3
> \end{bmatrix}
> =
> \begin{bmatrix}
> 17\\
> 14\\
> 12
> \end{bmatrix}.
> $$
>
> This means
>
> $$
> 4x_1+x_2+3x_3=17,
> $$
>
> $$
> x_1+5x_2+x_3=14,
> $$
>
> $$
> 2x_1-x_2+8x_3=12.
> $$
>
> Solve each equation for its diagonal variable:
>
> $$
> x_1=\frac{17-x_2-3x_3}{4},
> $$
>
> $$
> x_2=\frac{14-x_1-x_3}{5},
> $$
>
> $$
> x_3=\frac{12-2x_1+x_2}{8}.
> $$
>
> For Gauss-Seidel, we use updated values immediately.
>
> Therefore,
>
> $$
> x_1^{(k+1)}
> =
> \frac{17-x_2^{(k)}-3x_3^{(k)}}{4},
> $$
>
> $$
> x_2^{(k+1)}
> =
> \frac{14-x_1^{(k+1)}-x_3^{(k)}}{5},
> $$
>
> $$
> x_3^{(k+1)}
> =
> \frac{12-2x_1^{(k+1)}+x_2^{(k+1)}}{8}.
> $$
>
> Start with
>
> $$
> x^{(0)}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> First iteration:
>
> $$
> x_1^{(1)}
> =
> \frac{17-0-3(0)}{4}
> =
> \frac{17}{4}
> =
> 4.25.
> $$
>
> Now use this new value of $x_1^{(1)}$ to compute $x_2^{(1)}$:
>
> $$
> x_2^{(1)}
> =
> \frac{14-4.25-0}{5}
> =
> \frac{9.75}{5}
> =
> 1.95.
> $$
>
> Now use both new values $x_1^{(1)}$ and $x_2^{(1)}$:
>
> $$
> x_3^{(1)}
> =
> \frac{12-2(4.25)+1.95}{8}
> =
> \frac{12-8.5+1.95}{8}
> =
> \frac{5.45}{8}
> =
> 0.68125.
> $$
>
> Therefore,
>
> $$
> x^{(1)}
> =
> \begin{bmatrix}
> 4.25\\
> 1.95\\
> 0.68125
> \end{bmatrix}.
> $$
>
> Second iteration:
>
> $$
> x_1^{(2)}
> =
> \frac{17-x_2^{(1)}-3x_3^{(1)}}{4}
> =
> \frac{17-1.95-3(0.68125)}{4}.
> $$
>
> Since
>
> $$
> 3(0.68125)=2.04375,
> $$
>
> we get
>
> $$
> x_1^{(2)}
> =
> \frac{17-1.95-2.04375}{4}
> =
> \frac{13.00625}{4}
> =
> 3.2515625.
> $$
>
> Then
>
> $$
> x_2^{(2)}
> =
> \frac{14-x_1^{(2)}-x_3^{(1)}}{5}
> =
> \frac{14-3.2515625-0.68125}{5}.
> $$
>
> So
>
> $$
> x_2^{(2)}
> =
> \frac{10.0671875}{5}
> =
> 2.0134375.
> $$
>
> Then
>
> $$
> x_3^{(2)}
> =
> \frac{12-2x_1^{(2)}+x_2^{(2)}}{8}.
> $$
>
> Substitute:
>
> $$
> x_3^{(2)}
> =
> \frac{12-2(3.2515625)+2.0134375}{8}
> =
> \frac{7.5103125}{8}
> =
> 0.9387890625.
> $$
>
> Therefore,
>
> $$
> x^{(2)}
> \approx
> \begin{bmatrix}
> 3.25\\
> 2.01\\
> 0.94
> \end{bmatrix}.
> $$
>
> Third iteration:
>
> $$
> x_1^{(3)}
> =
> \frac{17-x_2^{(2)}-3x_3^{(2)}}{4}
> \approx
> \frac{17-2.01-3(0.94)}{4}
> \approx
> 2.98.
> $$
>
> Then
>
> $$
> x_2^{(3)}
> =
> \frac{14-x_1^{(3)}-x_3^{(2)}}{5}
> \approx
> \frac{14-2.98-0.94}{5}
> \approx
> 2.01.
> $$
>
> Then
>
> $$
> x_3^{(3)}
> =
> \frac{12-2x_1^{(3)}+x_2^{(3)}}{8}
> \approx
> 1.01.
> $$
>
> Thus
>
> $$
> x^{(3)}
> \approx
> \begin{bmatrix}
> 2.98\\
> 2.01\\
> 1.01
> \end{bmatrix}.
> $$
>
> The notes show that within about three steps, the error has decreased more
> than in five steps of Jacobi.
>
> The true solution is
>
> $$
> x=
> \begin{bmatrix}
> 3\\
> 2\\
> 1
> \end{bmatrix}.
> $$
>
> So in this example, Gauss-Seidel accelerates Jacobi.
>
> However, this acceleration does not always happen.

---

# Matrix Form of Gauss-Seidel

## Splitting the Matrix

> [!note] Matrix Splitting
> Write
>
> $$
> A=L+D+U,
> $$
>
> where:
>
> - $L$ is the strictly lower triangular part of $A$
> - $D$ is the diagonal part of $A$
> - $U$ is the strictly upper triangular part of $A$

> [!note] Explicit Matrix Form
> If
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & \cdots & a_{1n}\\
> a_{21} & a_{22} & a_{23} & \cdots & a_{2n}\\
> a_{31} & a_{32} & a_{33} & \cdots & a_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> a_{n1} & a_{n2} & a_{n3} & \cdots & a_{nn}
> \end{bmatrix},
> $$
>
> then
>
> $$
> L=
> \begin{bmatrix}
> 0 & 0 & 0 & \cdots & 0\\
> a_{21} & 0 & 0 & \cdots & 0\\
> a_{31} & a_{32} & 0 & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> a_{n1} & a_{n2} & a_{n3} & \cdots & 0
> \end{bmatrix},
> $$
>
> $$
> D=
> \begin{bmatrix}
> a_{11} & 0 & 0 & \cdots & 0\\
> 0 & a_{22} & 0 & \cdots & 0\\
> 0 & 0 & a_{33} & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & a_{nn}
> \end{bmatrix},
> $$
>
> and
>
> $$
> U=
> \begin{bmatrix}
> 0 & a_{12} & a_{13} & \cdots & a_{1n}\\
> 0 & 0 & a_{23} & \cdots & a_{2n}\\
> 0 & 0 & 0 & \cdots & a_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & 0
> \end{bmatrix}.
> $$

---

## Deriving the Matrix Form

> [!success]- Derivation
> The Gauss-Seidel recurrence is
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i
> -
> \sum_{j<i}a_{ij}x_j^{(k+1)}
> -
> \sum_{j>i}a_{ij}x_j^{(k)}
> \right).
> $$
>
> In matrix form, this means
>
> $$
> Dx^{(k+1)}
> =
> b-Lx^{(k+1)}-Ux^{(k)}.
> $$
>
> Move the lower triangular term to the left:
>
> $$
> Dx^{(k+1)}+Lx^{(k+1)}
> =
> b-Ux^{(k)}.
> $$
>
> Factor:
>
> $$
> (D+L)x^{(k+1)}
> =
> b-Ux^{(k)}.
> $$
>
> Therefore,
>
> $$
> x^{(k+1)}
> =
> (D+L)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$
>
> Since
>
> $$
> A=L+D+U,
> $$
>
> we have
>
> $$
> D+L=A-U.
> $$
>
> Therefore,
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$

> [!abstract] Gauss-Seidel Matrix Form
> The Gauss-Seidel recurrence is
>
> $$
> x^{(k+1)}
> =
> (D+L)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$
>
> Equivalently,
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$

> [!warning] Requirement
> Since
>
> $$
> A-U=D+L,
> $$
>
> and $D+L$ is lower triangular, we need the diagonal entries of $D$ to be
> nonzero.
>
> Equivalently,
>
> $$
> a_{ii}\ne 0
> \qquad
> \text{for all } i.
> $$
>
> This is the same diagonal requirement as Jacobi.

---

# Residual Form of Gauss-Seidel

## Residual

> [!note] Residual
> Define the residual:
>
> $$
> r^{(k)}=b-Ax^{(k)}.
> $$

---

## Residual Recurrence

> [!success]- Derivation
> Start with the matrix form:
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$
>
> Since
>
> $$
> A-U=D+L,
> $$
>
> this is
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$
>
> Now rewrite the term inside the parentheses:
>
> $$
> b-Ux^{(k)}
> =
> b-Ax^{(k)}+Ax^{(k)}-Ux^{(k)}.
> $$
>
> Since
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> we get
>
> $$
> b-Ux^{(k)}
> =
> r^{(k)}+(A-U)x^{(k)}.
> $$
>
> Substitute:
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}
> \left(
> r^{(k)}+(A-U)x^{(k)}
> \right).
> $$
>
> Distribute:
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}r^{(k)}
> +
> (A-U)^{-1}(A-U)x^{(k)}.
> $$
>
> Since
>
> $$
> (A-U)^{-1}(A-U)=I,
> $$
>
> this becomes
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}r^{(k)}
> +
> x^{(k)}.
> $$
>
> Therefore,
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+(A-U)^{-1}r^{(k)}.
> $$

> [!abstract] Residual Form
> The Gauss-Seidel method can be written as
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+(A-U)^{-1}r^{(k)}.
> $$

> [!tip] Comparison with Jacobi
> Jacobi residual form:
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}=x^{(k)}+D^{-1}r^{(k)}.
> $$
>
> Gauss-Seidel residual form:
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}=x^{(k)}+(A-U)^{-1}r^{(k)}.
> $$

---

# Error Analysis

## Error Vector

> [!note] Error Vector
> Let
>
> $$
> \bar{x}
> $$
>
> be the true solution of
>
> $$
> Ax=b.
> $$
>
> Define the error vector:
>
> $$
> e^{(k)}=\bar{x}-x^{(k)}.
> $$

---

## Error Recurrence

> [!success]- Derivation
> Start from the Gauss-Seidel residual form:
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+(A-U)^{-1}r^{(k)}.
> $$
>
> Then
>
> $$
> e^{(k+1)}
> =
> \bar{x}-x^{(k+1)}.
> $$
>
> Substitute the update:
>
> $$
> e^{(k+1)}
> =
> \bar{x}
> -
> \left(
> x^{(k)}+(A-U)^{-1}r^{(k)}
> \right).
> $$
>
> Therefore,
>
> $$
> e^{(k+1)}
> =
> \bar{x}-x^{(k)}-(A-U)^{-1}r^{(k)}.
> $$
>
> Since
>
> $$
> e^{(k)}=\bar{x}-x^{(k)},
> $$
>
> this becomes
>
> $$
> e^{(k+1)}
> =
> e^{(k)}-(A-U)^{-1}r^{(k)}.
> $$
>
> Now compute the residual:
>
> $$
> r^{(k)}=b-Ax^{(k)}.
> $$
>
> Since
>
> $$
> A\bar{x}=b,
> $$
>
> we get
>
> $$
> r^{(k)}
> =
> A\bar{x}-Ax^{(k)}.
> $$
>
> Factor:
>
> $$
> r^{(k)}
> =
> A(\bar{x}-x^{(k)}).
> $$
>
> Thus
>
> $$
> r^{(k)}=Ae^{(k)}.
> $$
>
> Substitute into the error equation:
>
> $$
> e^{(k+1)}
> =
> e^{(k)}-(A-U)^{-1}Ae^{(k)}.
> $$
>
> Factor:
>
> $$
> e^{(k+1)}
> =
> \left(
> I-(A-U)^{-1}A
> \right)e^{(k)}.
> $$

> [!abstract] Gauss-Seidel Error Recurrence
> The error satisfies
>
> $$
> e^{(k+1)}
> =
> \left(
> I-(A-U)^{-1}A
> \right)e^{(k)}.
> $$
>
> Therefore,
>
> $$
> e^{(k)}
> =
> \left(
> I-(A-U)^{-1}A
> \right)^k e^{(0)}.
> $$

---

# Convergence Condition

## Theorem

> [!abstract] Theorem
> The Gauss-Seidel method converges if and only if all eigenvalues of
>
> $$
> I-(A-U)^{-1}A
> $$
>
> are less than $1$ in absolute value.
>
> That is,
>
> $$
> |\lambda_i|<1
> $$
>
> for every eigenvalue $\lambda_i$ of
>
> $$
> I-(A-U)^{-1}A.
> $$

> [!note] Equivalent Statement
> The convergence condition is
>
> $$
> \rho\left(I-(A-U)^{-1}A\right)<1,
> $$
>
> where $\rho$ is the spectral radius.

---

# Comparison: Jacobi vs. Gauss-Seidel

## Residual Form Comparison

> [!note] Jacobi
> For Jacobi:
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}
> =
> D^{-1}r^{(k)}+x^{(k)}.
> $$

> [!note] Gauss-Seidel
> For Gauss-Seidel:
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}r^{(k)}+x^{(k)}.
> $$

---

## Convergence Comparison

> [!abstract] Jacobi Convergence
> Jacobi converges, regardless of starting vector $x^{(0)}$, if:
>
> $$
> D^{-1}
> $$
>
> exists, and all eigenvalues of
>
> $$
> I-D^{-1}A
> $$
>
> are less than $1$ in absolute value.

> [!abstract] Gauss-Seidel Convergence
> Gauss-Seidel converges, regardless of starting vector $x^{(0)}$, if:
>
> $$
> (A-U)^{-1}
> $$
>
> exists, and all eigenvalues of
>
> $$
> I-(A-U)^{-1}A
> $$
>
> are less than $1$ in absolute value.

---

# Summary

> [!summary] Gauss-Seidel Method
> Gauss-Seidel solves
>
> $$
> Ax=b
> $$
>
> iteratively.
>
> Its coordinate update is
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i
> -
> \sum_{j<i}a_{ij}x_j^{(k+1)}
> -
> \sum_{j>i}a_{ij}x_j^{(k)}
> \right).
> $$

> [!summary] Matrix Form
> With
>
> $$
> A=L+D+U,
> $$
>
> we have
>
> $$
> x^{(k+1)}
> =
> (D+L)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$
>
> Since
>
> $$
> D+L=A-U,
> $$
>
> this is also
>
> $$
> x^{(k+1)}
> =
> (A-U)^{-1}
> \left(
> b-Ux^{(k)}
> \right).
> $$

> [!summary] Residual Form
> Define
>
> $$
> r^{(k)}=b-Ax^{(k)}.
> $$
>
> Then
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+(A-U)^{-1}r^{(k)}.
> $$

> [!summary] Convergence
> Gauss-Seidel converges if and only if
>
> $$
> \rho\left(I-(A-U)^{-1}A\right)<1.
> $$
>
> Equivalently, all eigenvalues of
>
> $$
> I-(A-U)^{-1}A
> $$
>
> have absolute value less than $1$.

---
