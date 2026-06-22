# Lecture 17 - SVD Properties

> [!info] Lecture Overview
> Topics:
>
> - Recall full SVD
> - Recall reduced SVD
> - Sum of rank-one matrices
> - Spectral norm and induced $2$-norm
> - Condition number
> - Low-rank approximation
> - Closest singular matrix in spectral norm

---

# Recall: Full SVD

> [!note] Full SVD
> For
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> the full SVD is
>
> $$
> A=U\Sigma V^T.
> $$
>
> The matrix dimensions are:
>
> $$
> U\in\mathbb{R}^{m\times m},
> \qquad
> \Sigma\in\mathbb{R}^{m\times n},
> \qquad
> V\in\mathbb{R}^{n\times n}.
> $$
>
> Also,
>
> $$
> U^TU=UU^T=I,
> \qquad
> V^TV=VV^T=I.
> $$

> [!note] Rank and Singular Values
> If
>
> $$
> r=\operatorname{rank}(A),
> $$
>
> then the nonzero singular values satisfy
>
> $$
> \sigma_1\ge \sigma_2\ge \cdots \ge \sigma_r>0.
> $$
>
> The columns of $U$ are the **left singular vectors**.
>
> The columns of $V$ are the **right singular vectors**.

---

# Recall: Reduced SVD

> [!note] Reduced SVD
> If
>
> $$
> \operatorname{rank}(A)=r,
> $$
>
> then the reduced SVD is
>
> $$
> A=U_r\Sigma_rV_r^T.
> $$

> [!note] Shapes
> The reduced SVD uses:
>
> $$
> U_r=U(:,1:r)\in\mathbb{R}^{m\times r},
> $$
>
> $$
> \Sigma_r=\Sigma(1:r,1:r)\in\mathbb{R}^{r\times r},
> $$
>
> $$
> V_r=V(:,1:r)\in\mathbb{R}^{n\times r}.
> $$
>
> Therefore,
>
> $$
> A=U_r\Sigma_rV_r^T.
> $$

---

# Sum of Rank-One Matrices

> [!abstract] Sum of Rank-One Matrices
> From the reduced SVD,
>
> $$
> A=U_r\Sigma_rV_r^T.
> $$
>
> This is equivalent to the rank-one expansion:
>
> $$
> A=\sum_{i=1}^r \sigma_i u_i v_i^T.
> $$

> [!note] Meaning
> Each triple
>
> $$
> (\sigma_i,u_i,v_i)
> $$
>
> defines one rank-one component of $A$.
>
> These triples completely determine $A$.

> [!tip] Equivalent Relations
> The rank-one expansion is also connected to:
>
> $$
> Av_i=\sigma_i u_i,
> \qquad 1\le i\le r,
> $$
>
> and
>
> $$
> A^Tu_i=\sigma_i v_i,
> \qquad 1\le i\le r.
> $$

---

# Why Rank-One?

> [!note] Why $u_iv_i^T$ Has Rank One
> The matrix
>
> $$
> u_iv_i^T
> $$
>
> is an outer product.
>
> Since every column of $u_iv_i^T$ is a scalar multiple of $u_i$, the matrix has
> rank one.

> [!tip] Bottom Line
> The SVD is determined by the triples:
>
> $$
> \{(\sigma_i,u_i,v_i)\}_{i=1}^r.
> $$
>
> The rank-one expansion
>
> $$
> A=\sum_{i=1}^r\sigma_i u_iv_i^T
> $$
>
> is the core of SVD and leads to low-rank approximation.

---

# Spectral Norm and Condition Number

## Spectral Norm

> [!note] Definition: Spectral Norm
> The spectral norm, also called the induced $2$-norm, is
>
> $$
> \|A\|_2
> =
> \max_{x\ne 0}
> \frac{\|Ax\|_2}{\|x\|_2}.
> $$

> [!tip] Meaning
> The spectral norm measures the largest possible stretching factor of $A$.

---

## Spectral Norm Equals Largest Singular Value

> [!abstract] Theorem
> For any matrix
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> we have
>
> $$
> \|A\|_2=\sigma_1.
> $$
>
> Here $\sigma_1$ is the largest singular value of $A$.

> [!success]- Proof
> Since the columns of $V$ form an orthonormal basis for $\mathbb{R}^n$,
> write
>
> $$
> x=\sum_{i=1}^n c_i v_i.
> $$
>
> Then
>
> $$
> Ax
> =
> A\left(\sum_{i=1}^n c_i v_i\right)
> =
> \sum_{i=1}^n c_iAv_i.
> $$
>
> For $1\le i\le r$,
>
> $$
> Av_i=\sigma_i u_i.
> $$
>
> For $i>r$,
>
> $$
> Av_i=0.
> $$
>
> Therefore,
>
> $$
> Ax=\sum_{i=1}^r c_i\sigma_i u_i.
> $$
>
> Since the $u_i$ are orthonormal,
>
> $$
> \|Ax\|_2^2
> =
> \sum_{i=1}^r c_i^2\sigma_i^2.
> $$
>
> Also, since the $v_i$ are orthonormal,
>
> $$
> \|x\|_2^2
> =
> \sum_{i=1}^n c_i^2.
> $$
>
> Hence,
>
> $$
> \left(\frac{\|Ax\|_2}{\|x\|_2}\right)^2
> =
> \frac{\sum_{i=1}^r c_i^2\sigma_i^2}
> {\sum_{i=1}^n c_i^2}.
> $$
>
> Since
>
> $$
> \sigma_i^2\le \sigma_1^2,
> $$
>
> we get
>
> $$
> \left(\frac{\|Ax\|_2}{\|x\|_2}\right)^2
> \le
> \sigma_1^2.
> $$
>
> Therefore,
>
> $$
> \frac{\|Ax\|_2}{\|x\|_2}
> \le
> \sigma_1.
> $$
>
> Equality is achieved by taking
>
> $$
> x=v_1.
> $$
>
> Then
>
> $$
> Ax=Av_1=\sigma_1u_1.
> $$
>
> Since
>
> $$
> \|v_1\|_2=1,
> \qquad
> \|u_1\|_2=1,
> $$
>
> we get
>
> $$
> \frac{\|Av_1\|_2}{\|v_1\|_2}
> =
> \sigma_1.
> $$
>
> Therefore,
>
> $$
> \|A\|_2=\sigma_1.
> $$

---

## Condition Number

> [!abstract] Corollary
> For an invertible matrix
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> the $2$-norm condition number is
>
> $$
> \kappa_2(A)
> =
> \|A\|_2\|A^{-1}\|_2.
> $$

> [!note] Formula
> If the singular values of $A$ are
>
> $$
> \sigma_1\ge \sigma_2\ge \cdots \ge \sigma_n>0,
> $$
>
> then
>
> $$
> \|A\|_2=\sigma_1.
> $$
>
> Since
>
> $$
> A^{-1}=V\Sigma^{-1}U^T,
> $$
>
> the singular values of $A^{-1}$ are
>
> $$
> \frac{1}{\sigma_1},
> \frac{1}{\sigma_2},
> \ldots,
> \frac{1}{\sigma_n}.
> $$
>
> Therefore,
>
> $$
> \|A^{-1}\|_2=\frac{1}{\sigma_n}.
> $$
>
> So
>
> $$
> \kappa_2(A)
> =
> \frac{\sigma_1}{\sigma_n}.
> $$

---

# Low-Rank Approximation

## Recall: Rank-One Sum

> [!note] Recall
> We assume, for simplicity, that $m\ge n$.
>
> From SVD,
>
> $$
> A=U\Sigma V^T.
> $$
>
> Equivalently,
>
> $$
> A=\sum_{i=1}^r \sigma_i u_i v_i^T.
> $$

---

## Rank-$k$ Approximation

> [!note] Definition
> For every
>
> $$
> 1\le k\le r,
> $$
>
> define
>
> $$
> A_k=\sum_{i=1}^k \sigma_i u_i v_i^T.
> $$
>
> In particular,
>
> $$
> A_1=\sigma_1u_1v_1^T,
> \qquad
> A_r=A.
> $$

> [!tip] Meaning
> $A_k$ keeps only the first $k$ singular values and their corresponding
> singular vectors.
>
> So $A_k$ is a rank-$k$ approximation of $A$.

---

## Best Rank-$k$ Approximation

> [!abstract] Theorem(*Eckart–Young–Mirsky Theorem*)
> For
>
> $$
> 1\le k\le r,
> $$
>
> let
>
> $$
> \mathcal V_k
> =
> \{B\in\mathbb{R}^{m\times n}:\operatorname{rank}(B)\le k\}.
> $$
>
> Then
>
> $$
> \sigma_{k+1}
> =
> \|A-A_k\|_2
> =
> \min_{B\in\mathcal V_k}\|A-B\|_2.
> $$

> [!tip] Meaning
> Among all matrices of rank at most $k$, the closest one to $A$ in spectral
> norm is obtained by keeping the first $k$ singular value terms.

> [!success]- Proof
> We want to prove that for every matrix
>
> $$
> B\in \mathcal V_k,
> $$
>
> we must have
>
> $$
> \|A-B\|_2\ge \sigma_{k+1}.
> $$
>
> Since
>
> $$
> \operatorname{rank}(B)\le k,
> $$
>
> we know that
>
> $$
> \dim(\operatorname{Null}(B))\ge n-k.
> $$
>
> Also, consider the subspace
>
> $$
> \operatorname{span}\{v_1,\ldots,v_{k+1}\}.
> $$
>
> This space has dimension
>
> $$
> k+1.
> $$
>
> Since
>
> $$
> \dim(\operatorname{Null}(B))\ge n-k
> $$
>
> and
>
> $$
> \dim(\operatorname{span}\{v_1,\ldots,v_{k+1}\})=k+1,
> $$
>
> the two subspaces must have a nonzero intersection.
>
> So there exists a nonzero vector
>
> $$
> z\in \operatorname{span}\{v_1,\ldots,v_{k+1}\}
> $$
>
> such that
>
> $$
> Bz=0.
> $$
>
> Normalize $z$ so that
>
> $$
> \|z\|_2=1.
> $$
>
> Since
>
> $$
> z\in \operatorname{span}\{v_1,\ldots,v_{k+1}\},
> $$
>
> we can write
>
> $$
> z=\sum_{i=1}^{k+1}c_i v_i.
> $$
>
> Then
>
> $$
> Az
> =
> \sum_{i=1}^{k+1}c_i Av_i.
> $$
>
> Since
>
> $$
> Av_i=\sigma_i u_i,
> $$
>
> we get
>
> $$
> Az
> =
> \sum_{i=1}^{k+1}c_i\sigma_i u_i.
> $$
>
> Because the $u_i$ are orthonormal,
>
> $$
> \|Az\|_2^2
> =
> \sum_{i=1}^{k+1}c_i^2\sigma_i^2.
> $$
>
> Since
>
> $$
> \sigma_i\ge \sigma_{k+1}
> \qquad
> \text{for }1\le i\le k+1,
> $$
>
> we have
>
> $$
> \|Az\|_2^2
> \ge
> \sigma_{k+1}^2
> \sum_{i=1}^{k+1}c_i^2.
> $$
>
> But $\|z\|_2=1$, so
>
> $$
> \sum_{i=1}^{k+1}c_i^2=1.
> $$
>
> Therefore,
>
> $$
> \|Az\|_2\ge \sigma_{k+1}.
> $$
>
> Since $Bz=0$,
>
> $$
> (A-B)z=Az.
> $$
>
> Hence,
>
> $$
> \|(A-B)z\|_2=\|Az\|_2\ge \sigma_{k+1}.
> $$
>
> Using the definition of spectral norm,
>
> $$
> \|A-B\|_2
> =
> \max_{x\ne 0}\frac{\|(A-B)x\|_2}{\|x\|_2}.
> $$
>
> Since $\|z\|_2=1$,
>
> $$
> \|A-B\|_2
> \ge
> \|(A-B)z\|_2
> \ge
> \sigma_{k+1}.
> $$
>
> Therefore, for every $B\in\mathcal V_k$,
>
> $$
> \|A-B\|_2\ge \sigma_{k+1}.
> $$
>
> On the other hand, for
>
> $$
> A_k=\sum_{i=1}^k\sigma_i u_i v_i^T,
> $$
>
> we have
>
> $$
> A-A_k
> =
> \sum_{i=k+1}^r\sigma_i u_i v_i^T.
> $$
>
> Therefore, the largest singular value of $A-A_k$ is
>
> $$
> \sigma_{k+1}.
> $$
>
> So
>
> $$
> \|A-A_k\|_2=\sigma_{k+1}.
> $$
>
> Hence,
>
> $$
> \|A-A_k\|_2
> =
> \min_{B\in\mathcal V_k}\|A-B\|_2
> =
> \sigma_{k+1}.
> $$

---

## Closest Singular Matrix

> [!abstract] Corollary: Closest Singular Matrix
> Suppose
>
> $$
> m=n=r.
> $$
>
> This means $A$ is square and full rank, so $A$ is invertible.
>
> If
>
> $$
> B\in\mathbb{R}^{n\times n}
> $$
>
> satisfies
>
> $$
> \|A-B\|_2<\sigma_n,
> $$
>
> then $B$ is full rank.
>
> Therefore, $B$ is invertible and nonsingular.

> [!success]- Proof
> Since
>
> $$
> m=n=r,
> $$
>
> the matrix $A$ is square and full rank.
>
> Therefore,
>
> $$
> \sigma_n>0.
> $$
>
> Assume
>
> $$
> \|A-B\|_2<\sigma_n.
> $$
>
> We want to show that $B$ must be full rank.
>
> Suppose, for contradiction, that $B$ is singular.
>
> Since $B$ is singular,
>
> $$
> \operatorname{rank}(B)\le n-1.
> $$
>
> That means
>
> $$
> B\in \mathcal V_{n-1},
> $$
>
> where $\mathcal V_{n-1}$ is the set of all matrices with rank at most
> $n-1$.
>
> By the best rank-$k$ approximation theorem with $k=n-1$,
>
> $$
> \min_{C\in\mathcal V_{n-1}}\|A-C\|_2
> =
> \sigma_n.
> $$
>
> Since $B\in\mathcal V_{n-1}$, we must have
>
> $$
> \|A-B\|_2\ge \sigma_n.
> $$
>
> But this contradicts the assumption
>
> $$
> \|A-B\|_2<\sigma_n.
> $$
>
> Therefore, $B$ cannot be singular.
>
> Hence, $B$ is full rank, invertible, and nonsingular.

---

## Relative Distance to Singularity

> [!abstract] Corollary
> If
>
> $$
> m=n=r,
> $$
>
> then
>
> $$
> \frac{\|A-A_{n-1}\|_2}{\|A\|_2}
> =
> \frac{1}{\kappa_2(A)}.
> $$
>
> Also, $A_{n-1}$ is the closest singular matrix to $A$ in spectral norm.

> [!success]- Proof
> Since $A$ is square and full rank,
>
> $$
> \sigma_n>0.
> $$
>
> From the best rank-$k$ approximation theorem with $k=n-1$,
>
> $$
> \|A-A_{n-1}\|_2=\sigma_n.
> $$
>
> Also, since the spectral norm equals the largest singular value,
>
> $$
> \|A\|_2=\sigma_1.
> $$
>
> Therefore,
>
> $$
> \frac{\|A-A_{n-1}\|_2}{\|A\|_2}
> =
> \frac{\sigma_n}{\sigma_1}.
> $$
>
> But the $2$-norm condition number is
>
> $$
> \kappa_2(A)=\frac{\sigma_1}{\sigma_n}.
> $$
>
> Hence,
>
> $$
> \frac{\sigma_n}{\sigma_1}
> =
> \frac{1}{\kappa_2(A)}.
> $$
>
> Therefore,
>
> $$
> \frac{\|A-A_{n-1}\|_2}{\|A\|_2}
> =
> \frac{1}{\kappa_2(A)}.
> $$