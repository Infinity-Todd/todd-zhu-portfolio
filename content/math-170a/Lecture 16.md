# Lecture 16 - Rank-Deficient Least Squares and SVD

> [!info] Lecture Overview
> Topics:
>
> - What happens when $A$ is not full column rank
> - Why least squares can have infinitely many minimizers
> - Start singular value decomposition
> - Full SVD
> - Reduced SVD
> - Rank-one expansion of a matrix

---

## Context: Least Squares Setup

> [!note] Big Premise
> We are solving a least squares problem:
>
> $$
> x
> =
> \arg\min_x \|b-Ax\|_2.
> $$
>
> Here
>
> $$
> A\in \mathbb{R}^{m\times n},
> \qquad
> b\in \mathbb{R}^m,
> \qquad
> m\ge n.
> $$
>
> In the previous full-rank case, we assumed
>
> $$
> \operatorname{rank}(A)=n.
> $$
>
> Then the columns of $A$ are linearly independent, and the least squares
> minimizer is unique.

> [!tip] What Changes Now?
> Now we ask what happens when
>
> $$
> \operatorname{rank}(A)<n.
> $$
>
> This means $A$ is **not full column rank**.
>
> So the columns of $A$ are linearly dependent.

---

# Rank-Deficient Least Squares

## What if $\operatorname{rank}(A)<n$?

> [!question] What if $\operatorname{rank}(A)<n$?
> Suppose
>
> $$
> A\in \mathbb{R}^{m\times n}
> $$
>
> but
>
> $$
> \operatorname{rank}(A)<n.
> $$
>
> Then $A$ is **not full column rank**.
>
> In this case, the least squares problem can have **infinitely many minimizers**.

> [!note] Key Fact
> If $x$ is a minimizer, then
>
> $$
> x+y
> $$
>
> is also a minimizer for every
>
> $$
> y\in \operatorname{Null}(A).
> $$

> [!success]- Why?
> If
>
> $$
> y\in \operatorname{Null}(A),
> $$
>
> then by definition,
>
> $$
> Ay=0.
> $$
>
> So
>
> $$
> A(x+y)=Ax+Ay=Ax.
> $$
>
> Therefore,
>
> $$
> b-A(x+y)=b-Ax.
> $$
>
> Taking norms,
>
> $$
> \|b-A(x+y)\|_2=\|b-Ax\|_2.
> $$
>
> So $x+y$ gives the same residual size as $x$.
>
> Therefore, if $x$ is a minimizer, then $x+y$ is also a minimizer.

---

## Geometric Interpretation

> [!note] Geometry
> In least squares, we are trying to find the vector in
>
> $$
> \operatorname{Col}(A)
> $$
>
> closest to $b$.
>
> The vector $Ax$ is the projection of $b$ onto the column space:
>
> $$
> Ax = \operatorname{Proj}_{\operatorname{Col}(A)}(b).
> $$

> [!tip] Rank-Deficient Meaning
> If $A$ is not full column rank, then
>
> $$
> \operatorname{Null}(A)
> $$
>
> is nontrivial.
>
> That means there are nonzero vectors $y$ such that
>
> $$
> Ay=0.
> $$
>
> So many different coefficient vectors $x$ can produce the same fitted vector:
>
> $$
> Ax.
> $$

> [!warning] Common Mistake
> Least squares may still have a best approximation $Ax$.
>
> But the coefficient vector $x$ may not be unique.

![[infinitely many minimizer.png]]

---

# Singular Value Decomposition

## Motivation

> [!note] Motivation
> Singular Value Decomposition, or SVD, is one of the most important
> decompositions in applied math, engineering, data science, signal processing,
> imaging, statistics, and PCA.

---

## Full SVD

> [!abstract] Theorem: Full Singular Value Decomposition
> Let
>
> $$
> A\in \mathbb{R}^{m\times n}
> $$
>
> be a matrix with rank $r$.
>
> Then there exist orthogonal matrices
>
> $$
> U\in \mathbb{R}^{m\times m},
> \qquad
> V\in \mathbb{R}^{n\times n},
> $$
>
> and a diagonal matrix
>
> $$
> \Sigma\in \mathbb{R}^{m\times n}
> $$
>
> such that
>
> $$
> A=U\Sigma V^T.
> $$
> [!note] Singular Values
> The diagonal entries of $\Sigma$ are the singular values of $A$:
>
> $$
> \sigma_1\ge \sigma_2\ge \cdots \ge \sigma_r>0.
> $$
>
> Since $\operatorname{rank}(A)=r$, the remaining singular values are zero:
>
> $$
> \sigma_{r+1}=\cdots=\sigma_n=0.
> $$

> [!tip] Meaning of Rank
> The rank $r$ is equal to:
>
> - the number of nonzero singular values
> - the dimension of $\operatorname{Col}(A)$
> - the largest number of linearly independent columns
> - the largest number of linearly independent rows

![[SVD.png]]

---

## Non-Uniqueness

> [!warning] Full SVD Is Not Unique
> The full SVD is not unique.
>
> For example,
>
> $$
> U\Sigma V^T
> =
> (-U)\Sigma(-V)^T.
> $$
>
> But the singular values
>
> $$
> \sigma_1,\sigma_2,\ldots,\sigma_r
> $$
>
> are unique.

---

## Geometric Interpretation of SVD

> [!note] Geometric Interpretation
> A matrix
>
> $$
> A\in \mathbb{R}^{m\times n}
> $$
>
> defines a linear transformation
>
> $$
> A:\mathbb{R}^n\to \mathbb{R}^m.
> $$
>
> SVD describes what this transformation does to the unit sphere.

> [!tip] Main Idea
> Since
>
> $$
> A=U\Sigma V^T,
> $$
>
> we can think of the transformation in three steps:
>
> 1. $V^T$ rotates or reflects the input space.
> 2. $\Sigma$ scales along coordinate directions.
> 3. $U$ rotates or reflects the output space.

> [!note] Basis Interpretation
> The columns of $V$ form an orthonormal basis for $\mathbb{R}^n$.
>
> The columns of $U$ form an orthonormal basis for $\mathbb{R}^m$.
>
> In this basis, $A$ acts by scaling:
>
> $$
> Av_i=\sigma_i u_i.
> $$


![[geometric interpretation of svd.png|589]]

---

## Equivalent Formulations

> [!abstract] Equivalent Formulas
> Let
>
> $$
> U=[u_1,u_2,\ldots,u_m],
> \qquad
> V=[v_1,v_2,\ldots,v_n].
> $$
>
> Then the SVD condition
>
> $$
> A=U\Sigma V^T
> $$
>
> is equivalent to:
>
> $$
> Av_i=\sigma_i u_i
> \qquad
> \text{for } i\le r,
> $$
>
> and
>
> $$
> Av_i=0
> \qquad
> \text{for } r+1 \leq i\leq m.
> $$

> [!note] For $A^T$
> Similarly,
>
> $$
> A^T u_i=\sigma_i v_i
> \qquad
> \text{for } i\le r,
> $$
>
> and
>
> $$
> A^T u_i=0
> \qquad
> \text{for } r+1 \leq i\leq m.
> $$

---

# Reduced SVD

## Reduced SVD

> [!note] Reduced SVD
> In the full SVD,
>
> $$
> A=U\Sigma V^T.
> $$
>
> But many columns of $U$ and $V$ only multiply zeros in $\Sigma$.
>
> Therefore, we can keep only the important parts.
>
> The reduced SVD is
>
> $$
> A=U_r\Sigma_rV_r^T.
> $$

> [!note] Shapes
> If
>
> $$
> A\in \mathbb{R}^{m\times n}
> $$
>
> has rank $r$, then in the reduced SVD:
>
> $$
> U_r\in \mathbb{R}^{m\times r},
> $$
>
> $$
> \Sigma_r\in \mathbb{R}^{r\times r},
> $$
>
> $$
> V_r\in \mathbb{R}^{n\times r}.
> $$
>
> So
>
> $$
> A_{m\times n}
> =
> U_{r,m\times r}
> \Sigma_{r,r\times r}
> V_{r,n\times r}^T.
> $$

> [!tip] Why Reduced SVD Works
> The zero singular values do not contribute anything to $A$.
>
> So the columns corresponding to zero singular values can be removed.

![[Reduced SVD.png]]

---

## Rank-One Matrix Sum

> [!abstract] Rank-One Expansion
> The reduced SVD can also be written as a sum of rank-one matrices:
>
> $$
> A=\sum_{i=1}^r \sigma_i u_i v_i^T.
> $$

> [!tip] Interpretation
> Each term
>
> $$
> \sigma_i u_i v_i^T
> $$
>
> is a rank-one matrix.
>
> So SVD decomposes $A$ into a sum of rank-one pieces.

> [!note] Core of SVD
> The expression
>
> $$
> A=\sum_{i=1}^r \sigma_i u_iv_i^T
> $$
>
> is at the core of SVD.
>
> It is useful for low-rank approximation.
