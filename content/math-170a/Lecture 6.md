# Lecture 6 - Goal of PLU; Positive Definite Matrices; Cholesky

> [!info] Lecture Overview
> Topics:
>
> - Why PLU is useful
> - Solving $Ax=b$ using PLU
> - Cost comparison for many right-hand sides
> - LU vs. PLU recap
> - Positive definite matrices
> - Eigenvalue characterization of positive definiteness
> - Cholesky factorization
> - How to compute the Cholesky factor
> - MATLAB-style Cholesky code
> - Flop count comparison

---

# Why PLU?

## Setup

> [!note] Given PLU
> Suppose we have already computed
>
> $$
> L,\ U,\ P
> $$
>
> such that
>
> $$
> LU=PA.
> $$
>
> Here:
>
> - $L$ is unit lower triangular
> - $U$ is upper triangular
> - $P$ is a permutation matrix

> [!note] Matrix Types
> The matrices have the forms
>
> $$
> L=
> \begin{bmatrix}
> 1 & 0 & 0 & \cdots & 0\\
> \ell_{21} & 1 & 0 & \cdots & 0\\
> \ell_{31} & \ell_{32} & 1 & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> \ell_{n1} & \ell_{n2} & \ell_{n3} & \cdots & 1
> \end{bmatrix},
> $$
>
> $$
> U=
> \begin{bmatrix}
> u_{11} & u_{12} & u_{13} & \cdots & u_{1n}\\
> 0 & u_{22} & u_{23} & \cdots & u_{2n}\\
> 0 & 0 & u_{33} & \cdots & u_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & u_{nn}
> \end{bmatrix}.
> $$
>
> The entries of $L$ satisfy
>
> $$
> |\ell_{ij}|\le 1
> \qquad \text{for } i>j.
> $$

---

## Solving $Ax=b$ Using PLU

> [!abstract] PLU Solve
> Given
>
> $$
> LU=PA,
> $$
>
> to solve
>
> $$
> Ax=b,
> $$
>
> first multiply both sides by $P$:
>
> $$
> PAx=Pb.
> $$
>
> Since
>
> $$
> PA=LU,
> $$
>
> we get
>
> $$
> LUx=Pb.
> $$

> [!success]- Derivation
> Start with
>
> $$
> Ax=b.
> $$
>
> Multiply both sides by $P$:
>
> $$
> PAx=Pb.
> $$
>
> Since
>
> $$
> LU=PA,
> $$
>
> substitute:
>
> $$
> LUx=Pb.
> $$
>
> Now let
>
> $$
> y=Ux.
> $$
>
> Then
>
> $$
> Ly=Pb.
> $$
>
> So solving $Ax=b$ becomes two triangular systems:
>
> $$
> Ly=Pb,
> $$
>
> followed by
>
> $$
> Ux=y.
> $$
>
> The first one is solved by forward substitution, and the second one is solved
> by backward substitution.

> [!note] Cost
> Forward substitution costs
>
> $$
> n^2
> $$
>
> flops.
>
> Backward substitution costs
>
> $$
> n^2
> $$
>
> flops.
>
> Therefore, once $L,U,P$ are known, each solve costs about
>
> $$
> 2n^2
> $$
>
> flops.

---

# Why Factorization Helps

## Many Right-Hand Sides

> [!note] Practical Situation
> In practice, we often need to solve
>
> $$
> Ax=b_1,\quad Ax=b_2,\quad \ldots,\quad Ax=b_k
> $$
>
> for many different right-hand sides.

> [!warning] Solving Separately Is Expensive
> If we solve each system separately using Gaussian elimination and backward
> substitution, the cost is approximately
>
> $$
> k\left(\frac23 n^3\right).
> $$

> [!tip] Better Strategy
> Instead, compute one LU or PLU factorization:
>
> $$
> LU=PA.
> $$
>
> Once $L,U,P$ are known, each solve only costs about
>
> $$
> 2n^2.
> $$

> [!note] Total Cost With PLU
> One PLU factorization costs about
>
> $$
> \frac23 n^3.
> $$
>
> Then solving for $k$ different right-hand sides costs
>
> $$
> 2kn^2.
> $$
>
> So the total cost is
>
> $$
> \frac23 n^3+2kn^2.
> $$

> [!tip] Why This Is Much Better
> Compare:
>
> $$
> \text{solve separately}
> \approx
> \frac23 kn^3,
> $$
>
> while
>
> $$
> \text{factor once}
> \approx
> \frac23 n^3+2kn^2.
> $$
>
> When $k$ is large, factoring once is much better.

---

# Linear System Solvers So Far

> [!summary] Methods So Far
> So far, we have:
>
> - Gaussian elimination + backward substitution  
>   for one system $Ax=b$
>
> - PLU + forward substitution + backward substitution  
>   for many systems
>
> $$
> Ax=b_1,\quad Ax=b_2,\quad \ldots,\quad Ax=b_k
> $$
>
> - LU  
>   mostly a theoretical tool because it is unstable and only works sometimes

> [!warning] LU vs. PLU
> LU without pivoting:
>
> - exists only for some invertible matrices
> - unstable
> - only works sometimes
>
> PLU:
>
> - exists for all invertible matrices
> - stable
> - preferred in practice

---

# Can We Do Better?

> [!question] Main Question
> Can we do better than PLU?
>
> The answer is yes, if $A$ has extra properties.

> [!tip] Next Special Class
> The next special class of matrices is:
>
> $$
> \text{positive definite matrices}.
> $$

---

# Positive Definiteness

## Definition

> [!note] Definition: Positive Definite Matrix
> A symmetric matrix
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is **positive definite** if for every nonzero vector
>
> $$
> x\in\mathbb{R}^n,
> \qquad x\ne 0,
> $$
>
> we have
>
> $$
> x^TAx>0.
> $$

> [!warning] Symmetry Is Part of the Definition
> In this class, positive definite means:
>
> $$
> A=A^T
> $$
>
> and
>
> $$
> x^TAx>0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> So symmetry is not optional.

---

## Quadratic Form

> [!note] Quadratic Form
> The expression
>
> $$
> x^TAx
> $$
>
> is called a quadratic form.
>
> If
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
> then
>
> $$
> x^TAx
> =
> \begin{bmatrix}
> x_1 & x_2 & \cdots & x_n
> \end{bmatrix}
> A
> \begin{bmatrix}
> x_1\\
> x_2\\
> \vdots\\
> x_n
> \end{bmatrix}.
> $$

---

# Eigenvalue Characterization

## Theorem

> [!abstract] Positive Definiteness and Eigenvalues
> A symmetric matrix
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is positive definite if and only if all of its eigenvalues are positive.
>
> That is,
>
> $$
> A \text{ is positive definite}
> \iff
> \lambda_i>0
> \quad \text{for all } i.
> $$

---

## Proof

> [!success]- Proof
> First suppose $A$ is symmetric and positive definite.
>
> Let
>
> $$
> (\lambda,v)
> $$
>
> be an eigenpair of $A$, so
>
> $$
> Av=\lambda v.
> $$
>
> Since $v$ is an eigenvector,
>
> $$
> v\ne 0.
> $$
>
> By positive definiteness,
>
> $$
> v^TAv>0.
> $$
>
> But because
>
> $$
> Av=\lambda v,
> $$
>
> we get
>
> $$
> v^TAv
> =
> v^T(\lambda v).
> $$
>
> Since $\lambda$ is a scalar,
>
> $$
> v^T(\lambda v)
> =
> \lambda v^Tv.
> $$
>
> Also,
>
> $$
> v^Tv=\|v\|_2^2>0.
> $$
>
> Therefore,
>
> $$
> v^TAv
> =
> \lambda \|v\|_2^2.
> $$
>
> Since
>
> $$
> v^TAv>0
> $$
>
> and
>
> $$
> \|v\|_2^2>0,
> $$
>
> we must have
>
> $$
> \lambda>0.
> $$
>
> Hence all eigenvalues of $A$ are positive.
>
> Now suppose $A$ is symmetric and all eigenvalues are positive.
>
> Since $A$ is symmetric, it has an orthonormal eigenbasis:
>
> $$
> v_1,v_2,\ldots,v_n.
> $$
>
> That means
>
> $$
> v_i^Tv_j=
> \begin{cases}
> 0, & i\ne j,\\
> 1, & i=j.
> \end{cases}
> $$
>
> Since
>
> $$
> \{v_1,\ldots,v_n\}
> $$
>
> is a basis for $\mathbb{R}^n$, any vector
>
> $$
> x\in\mathbb{R}^n
> $$
>
> can be written as
>
> $$
> x=\sum_{i=1}^n c_i v_i.
> $$
>
> Now compute:
>
> $$
> x^TAx
> =
> \left(\sum_{i=1}^n c_i v_i\right)^T
> A
> \left(\sum_{j=1}^n c_j v_j\right).
> $$
>
> Since
>
> $$
> Av_j=\lambda_j v_j,
> $$
>
> this becomes
>
> $$
> x^TAx
> =
> \left(\sum_{i=1}^n c_i v_i\right)^T
> \left(\sum_{j=1}^n c_j \lambda_j v_j\right).
> $$
>
> Distribute:
>
> $$
> x^TAx
> =
> \sum_{i=1}^n\sum_{j=1}^n c_i c_j \lambda_j v_i^Tv_j.
> $$
>
> Since the eigenvectors are orthonormal,
>
> $$
> v_i^Tv_j=
> \begin{cases}
> 0, & i\ne j,\\
> 1, & i=j,
> \end{cases}
> $$
>
> all cross terms disappear.
>
> Therefore,
>
> $$
> x^TAx
> =
> \sum_{i=1}^n c_i^2\lambda_i.
> $$
>
> Since each
>
> $$
> \lambda_i>0,
> $$
>
> and if
>
> $$
> x\ne 0,
> $$
>
> then at least one coefficient $c_i\ne 0$, we get
>
> $$
> \sum_{i=1}^n c_i^2\lambda_i>0.
> $$
>
> Hence
>
> $$
> x^TAx>0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> Therefore, $A$ is positive definite.

---

# Why Positive Definite Matrices Matter

> [!note] Applications
> Positive definite matrices appear often in applications.
>
> Examples include:
>
> - sample covariance matrices
> - optimization
> - physical systems

> [!tip] Computational Advantage
> For positive definite matrices, LU / PLU takes a simpler form:
>
> $$
> A=R^TR.
> $$
>
> This is called the **Cholesky decomposition**.

---

# Cholesky Factorization

## Theorem

> [!abstract] Theorem: Cholesky Decomposition
> If
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is symmetric and positive definite, then there exists an
>
> $$
> n\times n
> $$
>
> upper triangular matrix
>
> $$
> R
> $$
>
> with positive diagonal entries such that
>
> $$
> A=R^TR.
> $$
>
> We call this the **Cholesky decomposition** of $A$, and $R$ is the
> **Cholesky factor**.

> [!note] Matrix Form
> The Cholesky factor has the form
>
> $$
> R=
> \begin{bmatrix}
> r_{11} & r_{12} & r_{13} & \cdots & r_{1n}\\
> 0 & r_{22} & r_{23} & \cdots & r_{2n}\\
> 0 & 0 & r_{33} & \cdots & r_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & r_{nn}
> \end{bmatrix},
> $$
>
> where
>
> $$
> r_{ii}>0
> \qquad \text{for all } i.
> $$

> [!note] Historical Note
> André-Louis Cholesky was a French mathematician of Polish origin.
>
> He discovered this decomposition while doing surveying / cartography work.
>
> He died in World War I in 1918, at age 42.

---

# How Do We Find $R$?

## Small Example

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & 1\\
> 1 & 5
> \end{bmatrix}.
> $$
>
> Find the upper triangular matrix
>
> $$
> R=
> \begin{bmatrix}
> r_{11} & r_{12}\\
> 0 & r_{22}
> \end{bmatrix}
> $$
>
> such that
>
> $$
> A=R^TR.
> $$

> [!success]- Solution
> First write
>
> $$
> R^T=
> \begin{bmatrix}
> r_{11} & 0\\
> r_{12} & r_{22}
> \end{bmatrix}.
> $$
>
> Then
>
> $$
> R^TR
> =
> \begin{bmatrix}
> r_{11} & 0\\
> r_{12} & r_{22}
> \end{bmatrix}
> \begin{bmatrix}
> r_{11} & r_{12}\\
> 0 & r_{22}
> \end{bmatrix}.
> $$
>
> Multiplying:
>
> $$
> R^TR
> =
> \begin{bmatrix}
> r_{11}^2 & r_{11}r_{12}\\
> r_{11}r_{12} & r_{12}^2+r_{22}^2
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> A=
> \begin{bmatrix}
> 1 & 1\\
> 1 & 5
> \end{bmatrix},
> $$
>
> match entries:
>
> $$
> r_{11}^2=1,
> $$
>
> $$
> r_{11}r_{12}=1,
> $$
>
> $$
> r_{12}^2+r_{22}^2=5.
> $$
>
> Because Cholesky requires positive diagonal entries,
>
> $$
> r_{11}=1.
> $$
>
> Then
>
> $$
> r_{11}r_{12}=1
> $$
>
> gives
>
> $$
> r_{12}=1.
> $$
>
> Finally,
>
> $$
> r_{12}^2+r_{22}^2=5
> $$
>
> gives
>
> $$
> 1^2+r_{22}^2=5.
> $$
>
> So
>
> $$
> r_{22}^2=4.
> $$
>
> Since the diagonal must be positive,
>
> $$
> r_{22}=2.
> $$
>
> Therefore,
>
> $$
> R=
> \begin{bmatrix}
> 1 & 1\\
> 0 & 2
> \end{bmatrix}.
> $$
>
> Check:
>
> $$
> R^TR
> =
> \begin{bmatrix}
> 1 & 0\\
> 1 & 2
> \end{bmatrix}
> \begin{bmatrix}
> 1 & 1\\
> 0 & 2
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1 & 1\\
> 1 & 5
> \end{bmatrix}
> =
> A.
> $$

---

# General Cholesky Algorithm

## General Matrix Equation

> [!note] General Setup
> Let
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & \cdots & a_{1n}\\
> a_{12} & a_{22} & a_{23} & \cdots & a_{2n}\\
> a_{13} & a_{23} & a_{33} & \cdots & a_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> a_{1n} & a_{2n} & a_{3n} & \cdots & a_{nn}
> \end{bmatrix}
> $$
>
> be symmetric, so
>
> $$
> A=A^T.
> $$
>
> Let
>
> $$
> R=
> \begin{bmatrix}
> r_{11} & r_{12} & r_{13} & \cdots & r_{1n}\\
> 0 & r_{22} & r_{23} & \cdots & r_{2n}\\
> 0 & 0 & r_{33} & \cdots & r_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & r_{nn}
> \end{bmatrix}.
> $$
>
> We want
>
> $$
> A=R^TR.
> $$

---

## Entrywise Formula

> [!note] Entrywise Equation
> Since
>
> $$
> A=R^TR,
> $$
>
> the $(i,j)$ entry satisfies
>
> $$
> a_{ij}
> =
> \sum_{k=1}^{i} r_{ki}r_{kj},
> \qquad j\ge i.
> $$
>
> This is because only the first $i$ entries in column $i$ of $R$ can be
> nonzero.

---

## General Equations

> [!abstract] Off-Diagonal Formula
> For
>
> $$
> j>i,
> $$
>
> the formula is
>
> $$
> r_{ij}
> =
> \frac{
> a_{ij}
> -
> \sum_{k=1}^{i-1}r_{ki}r_{kj}
> }{
> r_{ii}
> }.
> $$

> [!abstract] Diagonal Formula
> For
>
> $$
> j=i,
> $$
>
> the formula is
>
> $$
> r_{ii}
> =
> \sqrt{
> a_{ii}
> -
> \sum_{k=1}^{i-1}r_{ki}^2
> }.
> $$

> [!warning] Positive Diagonal
> We always choose the positive square root:
>
> $$
> r_{ii}>0.
> $$

---

## Matrix Picture of Filling $R$

> [!note] Filling Order
> The Cholesky algorithm fills $R$ row by row.
>
> The matrix has the form
>
> $$
> R=
> \begin{bmatrix}
> r_{11} & r_{12} & r_{13} & \cdots & r_{1n}\\
> 0 & r_{22} & r_{23} & \cdots & r_{2n}\\
> 0 & 0 & r_{33} & \cdots & r_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & r_{nn}
> \end{bmatrix}.
> $$
>
> At row $i$, we compute:
>
> $$
> r_{ii},\ r_{i,i+1},\ r_{i,i+2},\ldots,r_{in}.
> $$

---

# MATLAB Code for Cholesky

> [!example] MATLAB Code
> The notes give the following MATLAB-style code:
>
> ```matlab
> function R = cholesky_factor(A)
>     n = size(A,1);
>     R = triu(A);    % initialize R to upper triangular part of A
>
>     for i = 1:n
>         for k = 1:(i-1)
>             R(i,i) = R(i,i) - (R(k,i))^2;
>         end
>
>         if R(i,i) <= 0
>             error('matrix is not positive definite')
>         end
>
>         R(i,i) = sqrt(R(i,i));
>
>         for j = (i+1):n
>             for k = 1:(i-1)
>                 R(i,j) = R(i,j) - R(k,i)*R(k,j);
>             end
>
>             R(i,j) = R(i,j)/R(i,i);
>         end
>     end
> end
> ```

---

## Meaning of the Code

> [!note] Initialization
> The line
>
> ```matlab
> R = triu(A);
> ```
>
> initializes $R$ as the upper triangular part of $A$.
>
> This is reasonable because $R$ will be upper triangular.

> [!note] Compute Diagonal Entry
> For each row $i$, the code first computes
>
> $$
> r_{ii}
> =
> \sqrt{
> a_{ii}
> -
> \sum_{k=1}^{i-1}r_{ki}^2
> }.
> $$
>
> The loop
>
> ```matlab
> for k = 1:(i-1)
>     R(i,i) = R(i,i) - (R(k,i))^2;
> end
> ```
>
> subtracts the sum
>
> $$
> \sum_{k=1}^{i-1}r_{ki}^2.
> $$

> [!warning] Positive Definiteness Check
> The code checks:
>
> ```matlab
> if R(i,i) <= 0
>     error('matrix is not positive definite')
> end
> ```
>
> This is because we need
>
> $$
> R(i,i)>0
> $$
>
> before taking the square root.
>
> If this value is nonpositive, the matrix is not positive definite.

> [!note] Square Root Step
> The line
>
> ```matlab
> R(i,i) = sqrt(R(i,i));
> ```
>
> computes the positive diagonal entry:
>
> $$
> r_{ii}
> =
> \sqrt{
> a_{ii}
> -
> \sum_{k=1}^{i-1}r_{ki}^2
> }.
> $$

> [!note] Compute Off-Diagonal Entries
> For $j>i$, the code computes
>
> $$
> r_{ij}
> =
> \frac{
> a_{ij}
> -
> \sum_{k=1}^{i-1}r_{ki}r_{kj}
> }{
> r_{ii}
> }.
> $$
>
> The inner loop
>
> ```matlab
> for k = 1:(i-1)
>     R(i,j) = R(i,j) - R(k,i)*R(k,j);
> end
> ```
>
> subtracts
>
> $$
> \sum_{k=1}^{i-1}r_{ki}r_{kj}.
> $$
>
> Then
>
> ```matlab
> R(i,j) = R(i,j)/R(i,i);
> ```
>
> divides by
>
> $$
> r_{ii}.
> $$

---

# Flop Count

## Cost Comparison

> [!note] Review
> LU, PLU, Gaussian elimination plus backward substitution are all approximately
>
> $$
> \frac23 n^3
> $$
>
> flops.
>
> Cholesky is approximately
>
> $$
> \frac13 n^3
> $$
>
> flops.

> [!tip] Why Cholesky Is Cheaper
> Cholesky uses symmetry.
>
> Since
>
> $$
> A=A^T,
> $$
>
> we only need to compute one triangular factor:
>
> $$
> R.
> $$
>
> This saves about half the work compared with LU or PLU.

> [!warning] Important Limitation
> Cholesky only applies to positive definite matrices.
>
> That means $A$ must be:
>
> - symmetric
> - positive definite
>
> Equivalently, for symmetric $A$, all eigenvalues must be positive.

---

# Two Important Questions

> [!question] Question 1
> Why does Cholesky take only about half as many flops?

> [!answer] Answer
> Because positive definite matrices are symmetric:
>
> $$
> A=A^T.
> $$
>
> Cholesky only computes one triangular factor $R$ in
>
> $$
> A=R^TR.
> $$
>
> LU / PLU must compute both lower and upper triangular information.
>
> So Cholesky costs about
>
> $$
> \frac13 n^3
> $$
>
> instead of
>
> $$
> \frac23 n^3.
> $$

> [!question] Question 2
> How do we know if we can apply Cholesky?

> [!answer] Answer
> We can apply Cholesky if $A$ is positive definite.
>
> In this class, that means:
>
> $$
> A=A^T
> $$
>
> and
>
> $$
> x^TAx>0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> Equivalently, if $A$ is symmetric, then all eigenvalues of $A$ must be
> positive:
>
> $$
> \lambda_i>0
> \qquad
> \text{for all } i.
> $$

---
