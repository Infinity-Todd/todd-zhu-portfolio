# Lecture 25 - The Jacobi Method

> [!info] Lecture Overview
> Topics:
>
> - Understanding iterative methods
> - Jacobi method
> - Jacobi recurrence formula
> - When to stop the iteration
> - Example of Jacobi method
> - Matrix form of Jacobi method
> - Residual form
> - Error analysis
> - Convergence condition
> - Programming summary

---

# The Jacobi Method

## Goal

> [!note] Goal
> We want to solve the linear system
>
> $$
> Ax=b.
> $$
>
> Written entry by entry, this means
>
> $$
> \sum_{j=1}^n a_{ij}x_j=b_i,
> \qquad i=1,2,\ldots,n.
> $$

---

## Solve One Variable at a Time

> [!note] Rearranging the Equation
> Starting from
>
> $$
> \sum_{j=1}^n a_{ij}x_j=b_i,
> $$
>
> separate out the term with $j=i$:
>
> $$
> a_{ii}x_i+\sum_{j\ne i}a_{ij}x_j=b_i.
> $$
>
> Move the off-diagonal terms to the other side:
>
> $$
> a_{ii}x_i
> =
> b_i-\sum_{j\ne i}a_{ij}x_j.
> $$
>
> Divide by $a_{ii}$:
>
> $$
> x_i
> =
> \frac1{a_{ii}}
> \left(
> b_i-\sum_{j\ne i}a_{ij}x_j
> \right).
> $$

> [!warning] Requirement
> This formula requires
>
> $$
> a_{ii}\ne 0.
> $$
>
> Otherwise, we cannot divide by $a_{ii}$.

---

## Jacobi Iteration

> [!abstract] Jacobi Recurrence
> Instead of solving directly, we turn the formula into an iteration:
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
> i=1,2,\ldots,n,
> \qquad
> k=0,1,2,\ldots.
> $$

> [!tip] Meaning
> To compute the next vector
>
> $$
> x^{(k+1)},
> $$
>
> we use only the previous vector
>
> $$
> x^{(k)}.
> $$
>
> This is why Jacobi is an iterative method.

---

## Vector Form

> [!note] Iteration Vector
> The vector at step $k$ is
>
> $$
> x^{(k)}
> =
> \begin{bmatrix}
> x_1^{(k)}\\
> x_2^{(k)}\\
> \vdots\\
> x_n^{(k)}
> \end{bmatrix}.
> $$
>
> The next vector is
>
> $$
> x^{(k+1)}
> =
> \begin{bmatrix}
> x_1^{(k+1)}\\
> x_2^{(k+1)}\\
> \vdots\\
> x_n^{(k+1)}
> \end{bmatrix}.
> $$

---

## Stopping Criterion

> [!question] When Do We Stop?
> We stop when two consecutive iterates are close:
>
> $$
> \|x^{(k+1)}-x^{(k)}\|_2<\varepsilon.
> $$
>
> Here $\varepsilon$ is the tolerance.

> [!tip] Meaning
> If
>
> $$
> x^{(k+1)}
> $$
>
> is very close to
>
> $$
> x^{(k)},
> $$
>
> then the iteration is no longer changing much, so we treat the current vector
> as an approximate solution.

---

# Example: Jacobi Method

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
> Use the Jacobi method to approximate the solution.

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
> Solve each equation for the diagonal variable.
>
> From the first equation:
>
> $$
> 4x_1=17-x_2-3x_3,
> $$
>
> so
>
> $$
> x_1=\frac{17-x_2-3x_3}{4}.
> $$
>
> From the second equation:
>
> $$
> 5x_2=14-x_1-x_3,
> $$
>
> so
>
> $$
> x_2=\frac{14-x_1-x_3}{5}.
> $$
>
> From the third equation:
>
> $$
> 8x_3=12-2x_1+x_2,
> $$
>
> so
>
> $$
> x_3=\frac{12-2x_1+x_2}{8}.
> $$
>
> Therefore, the Jacobi iteration is
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
> \frac{14-x_1^{(k)}-x_3^{(k)}}{5},
> $$
>
> $$
> x_3^{(k+1)}
> =
> \frac{12-2x_1^{(k)}+x_2^{(k)}}{8}.
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
> For the first iteration:
>
> $$
> x_1^{(1)}
> =
> \frac{17-0-3(0)}{4}
> =
> \frac{17}{4}
> =
> 4.25,
> $$
>
> $$
> x_2^{(1)}
> =
> \frac{14-0-0}{5}
> =
> \frac{14}{5}
> =
> 2.8,
> $$
>
> $$
> x_3^{(1)}
> =
> \frac{12-2(0)+0}{8}
> =
> \frac{12}{8}
> =
> 1.5.
> $$
>
> Therefore,
>
> $$
> x^{(1)}
> =
> \begin{bmatrix}
> 4.25\\
> 2.8\\
> 1.5
> \end{bmatrix}.
> $$
>
> For the second iteration:
>
> $$
> x_1^{(2)}
> =
> \frac{17-2.8-3(1.5)}{4}
> =
> \frac{17-2.8-4.5}{4}
> =
> \frac{9.7}{4}
> =
> 2.425,
> $$
>
> $$
> x_2^{(2)}
> =
> \frac{14-4.25-1.5}{5}
> =
> \frac{8.25}{5}
> =
> 1.65,
> $$
>
> $$
> x_3^{(2)}
> =
> \frac{12-2(4.25)+2.8}{8}
> =
> \frac{12-8.5+2.8}{8}
> =
> \frac{6.3}{8}
> =
> 0.7875.
> $$
>
> Therefore,
>
> $$
> x^{(2)}
> =
> \begin{bmatrix}
> 2.425\\
> 1.65\\
> 0.7875
> \end{bmatrix}.
> $$
>
> The notes show the following sequence of approximations:
>
> $$
> x^{(1)}
> \approx
> \begin{bmatrix}
> 4.25\\
> 2.8\\
> 1.5
> \end{bmatrix},
> \qquad
> x^{(2)}
> \approx
> \begin{bmatrix}
> 2.425\\
> 1.65\\
> 0.79
> \end{bmatrix},
> $$
>
> $$
> x^{(3)}
> \approx
> \begin{bmatrix}
> 3.245\\
> 2.157\\
> 1.006
> \end{bmatrix},
> \qquad
> x^{(4)}
> \approx
> \begin{bmatrix}
> 2.958\\
> 1.950\\
> 0.959
> \end{bmatrix},
> $$
>
> $$
> x^{(5)}
> \approx
> \begin{bmatrix}
> 3.05\\
> 2.03\\
> 1.02
> \end{bmatrix}.
> $$
>
> The iterates approach
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
> Therefore, the true solution is
>
> $$
> \boxed{
> x=
> \begin{bmatrix}
> 3\\
> 2\\
> 1
> \end{bmatrix}
> }.
> $$

---

# Matrix Form of Jacobi Method

## Diagonal Matrix $D$

> [!note] Diagonal Part
> Let $D$ be the diagonal part of $A$:
>
> $$
> D=
> \begin{bmatrix}
> a_{11} & 0 & \cdots & 0\\
> 0 & a_{22} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & a_{nn}
> \end{bmatrix}.
> $$
>
> Then
>
> $$
> D^{-1}
> =
> \begin{bmatrix}
> \frac1{a_{11}} & 0 & \cdots & 0\\
> 0 & \frac1{a_{22}} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \frac1{a_{nn}}
> \end{bmatrix}.
> $$

> [!warning] Requirement
> We need $D^{-1}$ to exist.
>
> Therefore, all diagonal entries of $A$ must be nonzero:
>
> $$
> a_{ii}\ne 0
> \qquad
> \text{for all } i.
> $$

---

## Deriving Matrix Form

> [!success]- Derivation
> The coordinate formula is
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}
> \right).
> $$
>
> In matrix form, this becomes
>
> $$
> x^{(k+1)}
> =
> D^{-1}\left(b-(A-D)x^{(k)}\right).
> $$
>
> Distribute:
>
> $$
> x^{(k+1)}
> =
> D^{-1}b-D^{-1}(A-D)x^{(k)}.
> $$
>
> Since
>
> $$
> A-D=A-D,
> $$
>
> we can rewrite:
>
> $$
> -D^{-1}(A-D)
> =
> -D^{-1}A+D^{-1}D.
> $$
>
> Since
>
> $$
> D^{-1}D=I,
> $$
>
> we get
>
> $$
> -D^{-1}(A-D)
> =
> I-D^{-1}A.
> $$
>
> Therefore,
>
> $$
> x^{(k+1)}
> =
> D^{-1}b+\left(I-D^{-1}A\right)x^{(k)}.
> $$

> [!abstract] Matrix Form
> The Jacobi method can be written as
>
> $$
> x^{(k+1)}
> =
> D^{-1}b+\left(I-D^{-1}A\right)x^{(k)}.
> $$

---

# Residual Form

## Residual

> [!note] Residual
> Define the residual at iteration $k$ as
>
> $$
> r^{(k)}=b-Ax^{(k)}.
> $$
>
> The residual measures how far
>
> $$
> x^{(k)}
> $$
>
> is from satisfying
>
> $$
> Ax=b.
> $$

---

## Jacobi Method Using the Residual

> [!success]- Derivation
> Starting from the matrix form,
>
> $$
> x^{(k+1)}
> =
> D^{-1}b+\left(I-D^{-1}A\right)x^{(k)}.
> $$
>
> Distribute the second term:
>
> $$
> x^{(k+1)}
> =
> D^{-1}b+x^{(k)}-D^{-1}Ax^{(k)}.
> $$
>
> Group the $D^{-1}$ terms:
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+D^{-1}\left(b-Ax^{(k)}\right).
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
> x^{(k+1)}
> =
> x^{(k)}+D^{-1}r^{(k)}.
> $$

> [!abstract] Residual Form
> The Jacobi method can also be written as
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+D^{-1}r^{(k)}.
> $$

---

# Code Form

> [!example] Algorithm
> Start with
>
> $$
> x^{(0)}=0.
> $$
>
> Then repeat:
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}=x^{(k)}+D^{-1}r^{(k)}.
> $$

> [!note] Code Style
> In pseudocode:
>
> ```text
> x = 0
>
> repeat until convergence:
>     r = b - A*x
>     x = x + D^{-1}*r
> ```
>
> or repeat for a fixed number of iterations:
>
> ```text
> x = 0
>
> for k iterations:
>     r = b - A*x
>     x = x + D^{-1}*r
> ```

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
> We know
>
> $$
> x^{(k+1)}
> =
> x^{(k)}+D^{-1}r^{(k)}.
> $$
>
> Therefore,
>
> $$
> e^{(k+1)}
> =
> \bar{x}-x^{(k+1)}.
> $$
>
> Substitute the update formula:
>
> $$
> e^{(k+1)}
> =
> \bar{x}-x^{(k)}-D^{-1}r^{(k)}.
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
> e^{(k)}-D^{-1}r^{(k)}.
> $$
>
> Now compute the residual:
>
> $$
> r^{(k)}
> =
> b-Ax^{(k)}.
> $$
>
> Since the true solution satisfies
>
> $$
> A\bar{x}=b,
> $$
>
> we can rewrite:
>
> $$
> r^{(k)}
> =
> A\bar{x}-Ax^{(k)}.
> $$
>
> Factor out $A$:
>
> $$
> r^{(k)}
> =
> A(\bar{x}-x^{(k)}).
> $$
>
> Therefore,
>
> $$
> r^{(k)}
> =
> Ae^{(k)}.
> $$
>
> Substitute this into the error update:
>
> $$
> e^{(k+1)}
> =
> e^{(k)}-D^{-1}Ae^{(k)}.
> $$
>
> Factor:
>
> $$
> e^{(k+1)}
> =
> \left(I-D^{-1}A\right)e^{(k)}.
> $$

> [!abstract] Error Recurrence
> The error follows the recurrence
>
> $$
> e^{(k+1)}
> =
> \left(I-D^{-1}A\right)e^{(k)}.
> $$
>
> Therefore,
>
> $$
> e^{(k)}
> =
> \left(I-D^{-1}A\right)^k e^{(0)}.
> $$

---

# Convergence Condition

## Connection to Power Method

> [!tip] Connection
> The error recurrence
>
> $$
> e^{(k)}
> =
> \left(I-D^{-1}A\right)^k e^{(0)}
> $$
>
> looks like the power method.
>
> For the error to go to zero, repeated multiplication by
>
> $$
> I-D^{-1}A
> $$
>
> must shrink every component.

---

## Theorem

> [!abstract] Theorem
> The Jacobi method converges if and only if all eigenvalues of
>
> $$
> I-D^{-1}A
> $$
>
> are less than $1$ in absolute value.
>
> That is,
>
> $$
> |\lambda_i(I-D^{-1}A)|<1
> \qquad
> \text{for all } i.
> $$

> [!note] Equivalent Statement
> The Jacobi method converges if and only if
>
> $$
> \rho(I-D^{-1}A)<1,
> $$
>
> where
>
> $$
> \rho(I-D^{-1}A)
> $$
>
> is the spectral radius of the iteration matrix.

---

## Corollary

> [!abstract] Corollary
> The Jacobi method is going to converge, regardless of starting vector
>
> $$
> x^{(0)},
> $$
>
> if and only if all eigenvalues of
>
> $$
> I-D^{-1}A
> $$
>
> are less than $1$ in absolute value.

---

# Summary

## Jacobi Method Summary

> [!summary] Jacobi Method
> The Jacobi method solves
>
> $$
> Ax=b
> $$
>
> iteratively using
>
> $$
> x^{(k+1)}
> =
> D^{-1}\left(b-(A-D)x^{(k)}\right).
> $$
>
> Equivalently,
>
> $$
> x^{(k+1)}
> =
> D^{-1}b+\left(I-D^{-1}A\right)x^{(k)}.
> $$
>
> Another equivalent residual form is
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> $$
> x^{(k+1)}=x^{(k)}+D^{-1}r^{(k)}.
> $$

---

## How to Program It

> [!note] How to Program It
> Start with
>
> $$
> x^{(0)}=0
> $$
>
> for example.
>
> Then repeat until
>
> $$
> \|x^{(k+1)}-x^{(k)}\|_2<\varepsilon,
> $$
>
> or repeat for a fixed number of iterations.

> [!example] Pseudocode
> ```text
> x = 0
>
> repeat until ||x_new - x||_2 < epsilon:
>     r = b - A*x
>     x_new = x + D^{-1}*r
>     x = x_new
> ```
>
> Or:
>
> ```text
> x = 0
>
> for k iterations:
>     r = b - A*x
>     x = x + D^{-1}*r
> ```

---

## Conditions for Convergence

> [!note] Conditions for Convergence
> We need:
>
> $$
> D^{-1}
> $$
>
> to exist, meaning
>
> $$
> a_{ii}\ne 0
> \qquad
> \text{for all } i.
> $$
>
> We also need all eigenvalues of
>
> $$
> I-D^{-1}A
> $$
>
> to satisfy
>
> $$
> |\lambda_i|<1.
> $$

> [!tip] Next
> Complexity will be discussed later.