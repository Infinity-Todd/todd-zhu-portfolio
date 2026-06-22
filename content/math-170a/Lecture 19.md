# Lecture 19 - Pseudoinverse, Geometry of SVD, Eigenvalues

> [!info] Lecture Overview
> Topics:
>
> - Recap pseudoinverse
> - Solving least squares using SVD
> - Geometry of minimizers
> - Geometry of SVD
> - Eigenvalues and eigenvectors
> - Characteristic polynomial
> - Direct vs. iterative methods
> - Eigenvalues over $\mathbb{C}$ and $\mathbb{R}$

---

# Recap: Pseudoinverse

## Pseudoinverse Formula

> [!note] Pseudoinverse
> If
>
> $$
> A=U\Sigma V^T
> =
> U_r\Sigma_rV_r^T,
> $$
>
> then the pseudoinverse is
>
> $$
> A^+=V_r\Sigma_r^{-1}U_r^T.
> $$
>
> Equivalently, using the full SVD,
>
> $$
> A^+=V\Sigma^+U^T.
> $$

> [!note] Explicit Matrix Form
> If
>
> $$
> \Sigma_r=
> \begin{bmatrix}
> \sigma_1 & 0 & \cdots & 0\\
> 0 & \sigma_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \sigma_r
> \end{bmatrix},
> $$
>
> then
>
> $$
> \Sigma_r^{-1}
> =
> \begin{bmatrix}
> \frac1{\sigma_1} & 0 & \cdots & 0\\
> 0 & \frac1{\sigma_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \frac1{\sigma_r}
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> A^+
> =
> V_r
> \begin{bmatrix}
> \frac1{\sigma_1} & 0 & \cdots & 0\\
> 0 & \frac1{\sigma_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \frac1{\sigma_r}
> \end{bmatrix}
> U_r^T.
> $$

---

## Solving Least Squares with SVD

> [!note] Least Squares with SVD
> For the least squares problem
>
> $$
> \min_x \|b-Ax\|_2,
> $$
>
> the pseudoinverse gives the least squares minimizer with minimum $2$-norm:
>
> $$
> x=A^+b.
> $$

> [!note] Expanded Formula
> Since
>
> $$
> A^+=V_r\Sigma_r^{-1}U_r^T,
> $$
>
> we get
>
> $$
> x
> =
> V_r\Sigma_r^{-1}U_r^Tb.
> $$
>
> Writing the matrices explicitly:
>
> $$
> x
> =
> V_r
> \begin{bmatrix}
> \frac1{\sigma_1} & 0 & \cdots & 0\\
> 0 & \frac1{\sigma_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \frac1{\sigma_r}
> \end{bmatrix}
> \begin{bmatrix}
> u_1^T\\
> u_2^T\\
> \vdots\\
> u_r^T
> \end{bmatrix}
> b.
> $$
>
> Thus
>
> $$
> x
> =
> V_r
> \begin{bmatrix}
> \frac{u_1^Tb}{\sigma_1}\\
> \frac{u_2^Tb}{\sigma_2}\\
> \vdots\\
> \frac{u_r^Tb}{\sigma_r}
> \end{bmatrix}.
> $$

---

# All Least Squares Minimizers

## General Form

> [!note] All Other Minimizers
> The pseudoinverse solution
>
> $$
> x=A^+b
> $$
>
> is the least squares minimizer with minimum $2$-norm.
>
> All other least squares minimizers have the form
>
> $$
> x+y,
> \qquad
> y\in \operatorname{Null}(A).
> $$

> [!tip] Meaning
> The vector $A^+b$ is the minimizer closest to the origin.
>
> Adding any vector from $\operatorname{Null}(A)$ does not change the fitted
> vector because
>
> $$
> A(x+y)=Ax+Ay=Ax.
> $$

---

## Full Column Rank Case

> [!note] If $\operatorname{rank}(A)=n$
> If
>
> $$
> \operatorname{rank}(A)=n,
> \qquad m>n,
> $$
>
> then
>
> $$
> \operatorname{Null}(A)=\{0\}.
> $$
>
> Therefore, the minimizer is unique.
>
> In this case, we can use QR.

---

## Rank-Deficient Case

> [!warning] If $\operatorname{rank}(A)<n$
> If
>
> $$
> \operatorname{rank}(A)<n,
> $$
>
> then
>
> $$
> \operatorname{Null}(A)\ne \{0\}.
> $$
>
> So there are infinitely many least squares minimizers.
>
> In this case, we cannot use QR directly.
>
> We must use SVD.

---

# Geometry of Minimizers

## Space of Minimizers

> [!note] Geometry
> The set of all minimizers is an affine space:
>
> $$
> A^+b+\operatorname{Null}(A).
> $$
>
> This means:
>
> $$
> \text{all minimizers}
> =
> \{A^+b+y:y\in\operatorname{Null}(A)\}.
> $$

> [!tip] Closest to Origin
> The pseudoinverse solution
>
> $$
> A^+b
> $$
>
> is the point in the affine space of minimizers closest to the origin.
>
> So
>
> $$
> A^+b
> =
> \text{minimizer of minimal }2\text{-norm}.
> $$

![[geometry of minimizer.png]]

---

# Eigenvalues

## Definition

> [!note] Eigenvalue and Eigenvector
> For a square matrix
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> or
>
> $$
> A\in\mathbb{C}^{n\times n},
> $$
>
> an eigenpair is a pair
>
> $$
> (\lambda,v),
> $$
>
> where
>
> $$
> \lambda\in\mathbb{R}
> \quad\text{or}\quad
> \lambda\in\mathbb{C},
> $$
>
> and
>
> $$
> v\in\mathbb{R}^n
> \quad\text{or}\quad
> v\in\mathbb{C}^n,
> $$
>
> such that
>
> $$
> Av=\lambda v,
> $$
>
> with
>
> $$
> v\ne 0.
> $$

> [!tip] Meaning
> An eigenvector is a direction that is not rotated away from its own span.
>
> The matrix $A$ only scales it by $\lambda$:
>
> $$
> Av=\lambda v.
> $$

---

## Why Eigenvalues Matter

> [!note] Motivation
> We can view a square matrix as a linear transformation:
>
> $$
> A:\mathbb{R}^n\to\mathbb{R}^n.
> $$
>
> Eigenvectors tell us which lines or subspaces are mapped into themselves.

---

# Example: Orthogonal Projector

## Orthogonal Projector

> [!example] Example
> Let
>
> $$
> P\in\mathbb{R}^{n\times n}
> $$
>
> be an orthogonal projector.
>
> Then
>
> $$
> P^2=P,
> \qquad
> P=P^T.
> $$

> [!note] Example Form
> A common example is projection onto the span of a unit vector $u$:
>
> $$
> P=uu^T,
> \qquad
> \|u\|_2=1.
> $$

> [!note] Eigenvalue $1$
> Since
>
> $$
> P=uu^T,
> $$
>
> we have
>
> $$
> Pu=uu^Tu.
> $$
>
> Since
>
> $$
> u^Tu=1,
> $$
>
> this gives
>
> $$
> Pu=u.
> $$
>
> Therefore,
>
> $$
> (1,u)
> $$
>
> is an eigenpair.

> [!note] Eigenvalue $0$
> If
>
> $$
> v\in(\operatorname{span}\{u\})^\perp,
> $$
>
> then
>
> $$
> u^Tv=0.
> $$
>
> Therefore,
>
> $$
> Pv=uu^Tv=u(u^Tv)=u\cdot 0=0.
> $$
>
> So
>
> $$
> (0,v)
> $$
>
> is an eigenpair for every
>
> $$
> v\in(\operatorname{span}\{u\})^\perp.
> $$

> [!note] Dimension
> Since
>
> $$
> \dim((\operatorname{span}\{u\})^\perp)=n-1,
> $$
>
> there are $n-1$ linearly independent eigenvectors with eigenvalue $0$.

![[orthogonal projector eigenpair.png]]

---

# Difference Between Eigenvalues and SVD

## Main Difference

> [!note] How Eigenvalues Differ from SVD
> SVD studies how a matrix changes the unit sphere:
>
> $$
> S_n=\{x\in\mathbb{R}^n:\|x\|_2=1\}.
> $$
>
> Eigenvalues and eigenvectors study subspaces mapped by $A$ into themselves:
>
> $$
> Av=\lambda v.
> $$

---

# Eigenvalue Definition Again

## Formal Definition

> [!abstract] Definition
> For any
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> or
>
> $$
> A\in\mathbb{C}^{n\times n},
> $$
>
> $\lambda$ and $v$ are an eigenvalue/eigenvector pair if
>
> $$
> Av=\lambda v,
> $$
>
> and
>
> $$
> v\ne 0.
> $$
>
> We call $\lambda$ the eigenvalue and $v$ the corresponding eigenvector.

---

## Special Case: $\lambda=0$

> [!warning] Particular Case
> If
>
> $$
> \lambda=0,
> $$
>
> then
>
> $$
> Av=0.
> $$
>
> That means
>
> $$
> v\in\operatorname{Null}(A).
> $$
>
> Therefore, $0$ is an eigenvalue exactly when $A$ is singular.

> [!note] Determinant Condition
> If $\lambda=0$ is an eigenvalue, then
>
> $$
> \det(A)=0.
> $$
>
> So $A$ is singular, not invertible, and not full rank.

---

# How Do We Find Eigenvalues?

## Characteristic Polynomial

> [!note] Characteristic Polynomial
> Eigenvalues are roots of the characteristic polynomial:
>
> $$
> p_A(\lambda)=\det(\lambda I-A).
> $$
>
> Eigenvalues solve
>
> $$
> \det(\lambda I-A)=0.
> $$

> [!tip] Why?
> Starting from
>
> $$
> Av=\lambda v,
> $$
>
> move everything to one side:
>
> $$
> \lambda v-Av=0.
> $$
>
> Factor out $v$:
>
> $$
> (\lambda I-A)v=0.
> $$
>
> Since
>
> $$
> v\ne 0,
> $$
>
> this means $\lambda I-A$ must be singular.
>
> Therefore,
>
> $$
> \det(\lambda I-A)=0.
> $$

---

## Reminder: Computing Determinants

> [!note] Determinant Computation
> The determinant can be computed by expansion on rows or columns.
>
> In general, this has cost roughly
>
> $$
> O(n!).
> $$

> [!note] Faster Method
> The determinant can also be computed by performing row reduction on
> $\lambda I-A$ and taking the product of the pivots, with signs adjusted for
> row swaps.
>
> This has cost roughly
>
> $$
> O(n^3).
> $$

---

# Example: Find Eigenvalues and Eigenvectors

## Matrix

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 3 & 1\\
> 1 & 3
> \end{bmatrix}.
> $$
>
> Find:
>
> - the characteristic polynomial $p_A(\lambda)$
> - the eigenvalues of $A$
> - the eigenvectors of $A$

> [!success]- Solution
> The characteristic polynomial is
>
> $$
> p_A(\lambda)=\det(\lambda I-A).
> $$
>
> First compute
>
> $$
> \lambda I-A
> =
> \begin{bmatrix}
> \lambda & 0\\
> 0 & \lambda
> \end{bmatrix}
> -
> \begin{bmatrix}
> 3 & 1\\
> 1 & 3
> \end{bmatrix}
> =
> \begin{bmatrix}
> \lambda-3 & -1\\
> -1 & \lambda-3
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> p_A(\lambda)
> =
> \det
> \begin{bmatrix}
> \lambda-3 & -1\\
> -1 & \lambda-3
> \end{bmatrix}.
> $$
>
> For a $2\times 2$ matrix,
>
> $$
> \det
> \begin{bmatrix}
> a & b\\
> c & d
> \end{bmatrix}
> =
> ad-bc.
> $$
>
> So
>
> $$
> p_A(\lambda)
> =
> (\lambda-3)(\lambda-3)-(-1)(-1).
> $$
>
> Hence
>
> $$
> p_A(\lambda)
> =
> (\lambda-3)^2-1.
> $$
>
> Expand:
>
> $$
> p_A(\lambda)
> =
> \lambda^2-6\lambda+9-1
> =
> \lambda^2-6\lambda+8.
> $$
>
> Factor:
>
> $$
> p_A(\lambda)
> =
> (\lambda-4)(\lambda-2).
> $$
>
> Therefore, the eigenvalues are
>
> $$
> \lambda_1=4,
> \qquad
> \lambda_2=2.
> $$
>
> For $\lambda_1=4$, solve
>
> $$
> (\lambda I-A)v=0.
> $$
>
> Then
>
> $$
> 4I-A
> =
> \begin{bmatrix}
> 4 & 0\\
> 0 & 4
> \end{bmatrix}
> -
> \begin{bmatrix}
> 3 & 1\\
> 1 & 3
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1 & -1\\
> -1 & 1
> \end{bmatrix}.
> $$
>
> So
>
> $$
> \begin{bmatrix}
> 1 & -1\\
> -1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> v_1\\
> v_2
> \end{bmatrix}
> =
> \begin{bmatrix}
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> This gives
>
> $$
> v_1-v_2=0.
> $$
>
> Therefore,
>
> $$
> v_1=v_2.
> $$
>
> We can choose
>
> $$
> v=
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> So one eigenpair is
>
> $$
> \left(
> 4,
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}
> \right).
> $$
>
> For $\lambda_2=2$, compute
>
> $$
> 2I-A
> =
> \begin{bmatrix}
> 2 & 0\\
> 0 & 2
> \end{bmatrix}
> -
> \begin{bmatrix}
> 3 & 1\\
> 1 & 3
> \end{bmatrix}
> =
> \begin{bmatrix}
> -1 & -1\\
> -1 & -1
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> \begin{bmatrix}
> -1 & -1\\
> -1 & -1
> \end{bmatrix}
> \begin{bmatrix}
> v_1\\
> v_2
> \end{bmatrix}
> =
> \begin{bmatrix}
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> This gives
>
> $$
> v_1+v_2=0.
> $$
>
> Therefore,
>
> $$
> v_1=-v_2.
> $$
>
> We can choose
>
> $$
> v=
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}.
> $$
>
> So another eigenpair is
>
> $$
> \left(
> 2,
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}
> \right).
> $$

---

# Direct vs. Iterative Methods

## Why Characteristic Polynomial Is Not Enough

> [!note] Simple Method
> For small matrices, we can find eigenvalues by:
>
> 1. computing
>
> $$
> p_A(\lambda)=\det(\lambda I-A),
> $$
>
> 2. solving
>
> $$
> p_A(\lambda)=0,
> $$
>
> 3. finding each eigenvector from
>
> $$
> (\lambda I-A)v=0.
> $$

> [!warning] Limitation
> This cannot generally be done for large matrices.
>
> For polynomial equations of degree
>
> $$
> n>5,
> $$
>
> there is no general algebraic formula for the roots.

---

## Abel-Ruffini Theorem

> [!abstract] Theorem: Abel-Ruffini
> Polynomial equations of degree
>
> $$
> 2,3,4
> $$
>
> can be solved by algebraic formulas.
>
> But no such general formula exists for degree
>
> $$
> n>5.
> $$

> [!tip] Consequence
> Since eigenvalues are roots of
>
> $$
> p_A(\lambda),
> $$
>
> no direct formula can generally produce eigenvalues for large matrices.

---

## Direct Methods

> [!note] Direct Methods
> Direct methods are algorithms that use straightforward finite calculations.
>
> They produce exact answers in exact arithmetic after a finite number of steps.
>
> Examples from this class include:
>
> - LU
> - PLU
> - Cholesky
> - QR
> - least squares with SVD

> [!warning] Limitation
> Abel-Ruffini says that no direct method can produce exact roots of general
> polynomials of high degree.
>
> Therefore, eigenvalue algorithms usually cannot rely on exact closed-form
> formulas.

---

## Iterative Methods

> [!note] Iterative Methods
> Iterative methods try to find the solution as a limit of a sequence of
> approximations.
>
> They involve computing many approximations:
>
> $$
> x_0,x_1,x_2,\ldots
> $$
>
> and hope that
>
> $$
> x_k\to x.
> $$

> [!tip] In This Class
> In this class, iterative methods will be used for:
>
> - eigenvalues
> - singular values
> - solving linear systems
