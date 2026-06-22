# Lecture 13 - Orthogonality, Projections

> [!info] Lecture Overview
> Topics:
>
> - Orthogonal matrices
> - Orthogonal vs. isometry
> - Orthonormal columns from Gram-Schmidt
> - Distance-preserving property of orthogonal matrices
> - Square QR factorization
> - Projector matrices
> - Orthogonal projectors
> - Rank-one projector $P=uu^T$
> - Projection onto $\operatorname{span}\{u\}$
> - Projection onto a general subspace
> - Projection matrix $P=QQ^T$

---

# Orthogonal Matrices

## Definition

> [!note] Definition: Orthogonal Matrix
> A matrix
>
> $$
> Q
> $$
>
> is orthogonal if
>
> $$
> Q\in\mathbb{R}^{n\times n},
> $$
>
> and
>
> $$
> Q^TQ=QQ^T=I_n.
> $$
>
> Equivalently,
>
> $$
> Q^{-1}=Q^T.
> $$

> [!note] Equivalent Description
> A matrix is orthogonal if it is square and has orthonormal columns.
>
> That means if
>
> $$
> Q=
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix},
> $$
>
> then
>
> $$
> \langle q_i,q_j\rangle
> =
> \begin{cases}
> 0, & i\ne j,\\
> 1, & i=j.
> \end{cases}
> $$

---

## Why Square Matters

> [!warning] Square Is Important
> The matrix must be square to be called orthogonal.
>
> If
>
> $$
> Q\in\mathbb{R}^{m\times n},
> \qquad m>n,
> $$
>
> and $Q$ has orthonormal columns, then
>
> $$
> Q^TQ=I_n.
> $$
>
> However,
>
> $$
> QQ^T\ne I_m.
> $$
>
> So a tall matrix with orthonormal columns is not called an orthogonal matrix.
>
> It is an isometry.

> [!tip] From Gram-Schmidt
> If $Q$ is obtained from Gram-Schmidt and
>
> $$
> Q\in\mathbb{R}^{m\times n},
> \qquad m>n,
> $$
>
> then
>
> $$
> Q^TQ=I_n.
> $$
>
> But usually
>
> $$
> QQ^T\ne I_m.
> $$
>
> In this case, $QQ^T$ is a projection matrix onto
>
> $$
> \operatorname{Col}(Q).
> $$

---

## Recent Example of Orthogonal Matrices

> [!question] Question
> What recent type of matrix we encountered is orthogonal?

> [!tip] Answer
> Permutation matrices are orthogonal.
>
> If $P$ is a permutation matrix, then
>
> $$
> P^TP=PP^T=I.
> $$
>
> Therefore,
>
> $$
> P^{-1}=P^T.
> $$

---

# Crucial Property of Orthogonal Matrices

## Distance Preservation

> [!abstract] Crucial Property
> Orthogonal matrices preserve Euclidean distance:
>
> $$
> \|Qx\|_2=\|x\|_2
> $$
>
> for all orthogonal
>
> $$
> Q\in\mathbb{R}^{n\times n},
> $$
>
> and all
>
> $$
> x\in\mathbb{R}^n.
> $$

> [!success]- Proof
> Start with
>
> $$
> \|Qx\|_2^2.
> $$
>
> By definition of the Euclidean norm,
>
> $$
> \|Qx\|_2^2
> =
> \langle Qx,Qx\rangle.
> $$
>
> In matrix form,
>
> $$
> \langle Qx,Qx\rangle
> =
> (Qx)^T(Qx).
> $$
>
> Now use transpose rules:
>
> $$
> (Qx)^T(Qx)
> =
> x^TQ^TQx.
> $$
>
> Since $Q$ is orthogonal,
>
> $$
> Q^TQ=I.
> $$
>
> Therefore,
>
> $$
> x^TQ^TQx
> =
> x^TIx.
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
> x^TIx=x^Tx.
> $$
>
> But
>
> $$
> x^Tx=\|x\|_2^2.
> $$
>
> Hence
>
> $$
> \|Qx\|_2^2=\|x\|_2^2.
> $$
>
> Since norms are nonnegative,
>
> $$
> \|Qx\|_2=\|x\|_2.
> $$

> [!tip] Meaning
> Orthogonal matrices do not stretch or shrink vectors in Euclidean norm.
>
> They only rotate or reflect vectors.

---

# QR for Square Invertible Matrices

> [!note] Note
> If
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is invertible and
>
> $$
> A=QR,
> $$
>
> where $Q$ is orthogonal and $R$ is upper triangular with positive diagonal
> entries, then this is the square QR factorization.
>
> In this case,
>
> $$
> Q^TQ=QQ^T=I_n.
> $$

> [!note] Matrix Form
> The factorization looks like
>
> $$
> A=
> \begin{bmatrix}
> | & | & & |\\
> a_1 & a_2 & \cdots & a_n\\
> | & | & & |
> \end{bmatrix}
> =
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix}
> \begin{bmatrix}
> r_{11} & r_{12} & r_{13} & \cdots & r_{1n}\\
> 0 & r_{22} & r_{23} & \cdots & r_{2n}\\
> 0 & 0 & r_{33} & \cdots & r_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & r_{nn}
> \end{bmatrix}.
> $$

---

# Projector Matrices

## Definition

> [!note] Definition: Projector Matrix
> A projector matrix $P$ is a square matrix satisfying
>
> $$
> P^2=P.
> $$
>
> This property is called **idempotence**.

> [!note] Orthogonal Projector
> If
>
> $$
> P=P^T
> $$
>
> as well, then $P$ is an orthogonal projector.

> [!tip] Meaning
> A projector sends a vector onto a subspace.
>
> Applying the same projector twice does nothing new:
>
> $$
> P(Px)=Px.
> $$
>
> This is exactly the meaning of
>
> $$
> P^2=P.
> $$

---

# Rank-One Orthogonal Projector

## Lemma

> [!abstract] Lemma
> Let
>
> $$
> u\in\mathbb{R}^n,
> \qquad
> \|u\|_2=1.
> $$
>
> Then
>
> $$
> P=uu^T
> $$
>
> is an orthogonal projector.
>
> It projects orthogonally onto
>
> $$
> \operatorname{span}\{u\}.
> $$

---

## Explicit Matrix Form

> [!note] Matrix Form of $P=uu^T$
> If
>
> $$
> u=
> \begin{bmatrix}
> u_1\\
> u_2\\
> \vdots\\
> u_n
> \end{bmatrix},
> $$
>
> then
>
> $$
> u^T=
> \begin{bmatrix}
> u_1 & u_2 & \cdots & u_n
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> P=uu^T
> =
> \begin{bmatrix}
> u_1\\
> u_2\\
> \vdots\\
> u_n
> \end{bmatrix}
> \begin{bmatrix}
> u_1 & u_2 & \cdots & u_n
> \end{bmatrix}.
> $$
>
> So
>
> $$
> P=
> \begin{bmatrix}
> u_1^2 & u_1u_2 & \cdots & u_1u_n\\
> u_2u_1 & u_2^2 & \cdots & u_2u_n\\
> \vdots & \vdots & \ddots & \vdots\\
> u_nu_1 & u_nu_2 & \cdots & u_n^2
> \end{bmatrix}.
> $$

---

## Proof That $P=uu^T$ Is an Orthogonal Projector

> [!success]- Proof
> We need to show that
>
> $$
> P^2=P
> $$
>
> and
>
> $$
> P=P^T.
> $$
>
> First, check what $P$ does to $u$:
>
> $$
> Pu=(uu^T)u.
> $$
>
> By associativity,
>
> $$
> (uu^T)u=u(u^Tu).
> $$
>
> Since
>
> $$
> u^Tu=\|u\|_2^2=1,
> $$
>
> we get
>
> $$
> Pu=u.
> $$
>
> So $u$ stays fixed under the projection.
>
> Now suppose
>
> $$
> v\in\mathbb{R}^n
> $$
>
> and
>
> $$
> v^Tu=\langle v,u\rangle=0.
> $$
>
> Then
>
> $$
> Pv=(uu^T)v.
> $$
>
> Regroup:
>
> $$
> (uu^T)v=u(u^Tv).
> $$
>
> Since
>
> $$
> u^Tv=v^Tu=0,
> $$
>
> we get
>
> $$
> Pv=u(0)=0.
> $$
>
> So every vector orthogonal to $u$ is sent to $0$.
>
> Now check idempotence:
>
> $$
> P^2=(uu^T)(uu^T).
> $$
>
> Regroup:
>
> $$
> P^2=u(u^Tu)u^T.
> $$
>
> Since
>
> $$
> u^Tu=1,
> $$
>
> this becomes
>
> $$
> P^2=uu^T.
> $$
>
> Therefore,
>
> $$
> P^2=P.
> $$
>
> Finally, check symmetry:
>
> $$
> P^T=(uu^T)^T.
> $$
>
> Using
>
> $$
> (AB)^T=B^TA^T,
> $$
>
> we get
>
> $$
> (uu^T)^T=(u^T)^Tu^T.
> $$
>
> Since
>
> $$
> (u^T)^T=u,
> $$
>
> we have
>
> $$
> P^T=uu^T=P.
> $$
>
> Therefore,
>
> $$
> P^2=P
> \qquad
> \text{and}
> \qquad
> P=P^T.
> $$
>
> Hence $P=uu^T$ is an orthogonal projector.

---

# Geometric Interpretation

## Decomposing a Vector

> [!note] Decomposition
> Let
>
> $$
> x\in\mathbb{R}^n.
> $$
>
> We can decompose $x$ as
>
> $$
> x=y+z,
> $$
>
> where
>
> $$
> y\in\operatorname{span}\{u\},
> $$
>
> and
>
> $$
> z\in\operatorname{span}\{u\}^{\perp}.
> $$
>
> This means
>
> $$
> z^Tu=0.
> $$

---

## Projection Onto $\operatorname{span}\{u\}$

> [!abstract] Projection Formula
> If
>
> $$
> \|u\|_2=1,
> $$
>
> then the projection of $x$ onto
>
> $$
> \operatorname{span}\{u\}
> $$
>
> is
>
> $$
> y=\operatorname{Proj}_{\operatorname{span}\{u\}}(x)
> =
> \operatorname{Proj}_{\{u\}}(x)
> =
> uu^Tx.
> $$
>
> The projection matrix is
>
> $$
> P=uu^T.
> $$

> [!success]- Why $Px=y$
> Since
>
> $$
> x=y+z,
> $$
>
> where
>
> $$
> y\in\operatorname{span}\{u\},
> \qquad
> z\in\operatorname{span}\{u\}^{\perp},
> $$
>
> and
>
> $$
> z^Tu=0,
> $$
>
> compute
>
> $$
> Px=uu^T(y+z).
> $$
>
> Distribute:
>
> $$
> Px=uu^Ty+uu^Tz.
> $$
>
> Since $y\in\operatorname{span}\{u\}$, there exists a scalar $c$ such that
>
> $$
> y=cu.
> $$
>
> Then
>
> $$
> uu^Ty=uu^T(cu).
> $$
>
> Pull out $c$:
>
> $$
> uu^T(cu)=c\,uu^Tu.
> $$
>
> Since
>
> $$
> u^Tu=1,
> $$
>
> this becomes
>
> $$
> c\,u=y.
> $$
>
> Also,
>
> $$
> uu^Tz=u(u^Tz).
> $$
>
> Since
>
> $$
> z^Tu=0,
> $$
>
> we have
>
> $$
> u^Tz=0.
> $$
>
> Therefore,
>
> $$
> uu^Tz=0.
> $$
>
> Hence
>
> $$
> Px=y+0=y.
> $$
>
> Therefore,
>
> $$
> Px=\operatorname{Proj}_{\operatorname{span}\{u\}}(x).
> $$

---

## Orthogonal Error

> [!note] Error After Projection
> The projection is
>
> $$
> y=uu^Tx.
> $$
>
> Therefore, the part of $x$ perpendicular to the subspace is
>
> $$
> x-y.
> $$
>
> Since
>
> $$
> y=uu^Tx,
> $$
>
> we get
>
> $$
> x-y=x-uu^Tx.
> $$
>
> Factor out $x$:
>
> $$
> x-y=(I-uu^T)x.
> $$
>
> This is the projection onto
>
> $$
> \operatorname{span}\{u\}^{\perp}.
> $$

> [!abstract] Complementary Projection
> The projection matrix onto
>
> $$
> \operatorname{span}\{u\}^{\perp}
> $$
>
> is
>
> $$
> I-uu^T.
> $$

---

# Projection Onto a General Subspace

## Setup

> [!note] General Subspace
> Suppose
>
> $$
> S
> $$
>
> is a subspace with
>
> $$
> \dim(S)=n.
> $$
>
> To project onto $S$, we need an orthonormal basis for $S$:
>
> $$
> \{q_1,q_2,\ldots,q_n\}.
> $$

> [!tip] How to Get the Orthonormal Basis
> If we only have a regular basis for $S$, use Gram-Schmidt to produce an
> orthonormal basis:
>
> $$
> q_1,q_2,\ldots,q_n.
> $$

---

## Projection Formula

> [!abstract] Projection Onto $S$
> If
>
> $$
> \{q_1,q_2,\ldots,q_n\}
> $$
>
> is an orthonormal basis for $S$, then
>
> $$
> P_S(x)=\operatorname{Proj}_S(x)
> =
> \sum_{i=1}^{n}\operatorname{Proj}_{q_i}(x).
> $$
>
> Since
>
> $$
> q_i
> $$
>
> has unit length,
>
> $$
> \operatorname{Proj}_{q_i}(x)
> =
> q_iq_i^Tx.
> $$
>
> Therefore,
>
> $$
> P_S(x)
> =
> \sum_{i=1}^{n}q_iq_i^Tx.
> $$

---

## Matrix Formula

> [!note] Matrix Form
> Let
>
> $$
> Q=
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix}.
> $$
>
> Then
>
> $$
> QQ^T
> =
> \sum_{i=1}^{n}q_iq_i^T.
> $$
>
> Therefore,
>
> $$
> P_S(x)=QQ^Tx.
> $$

> [!abstract] Projection Matrix
> The orthogonal projection matrix onto $S=\operatorname{Col}(Q)$ is
>
> $$
> P=QQ^T.
> $$

---

## Explicit Matrix Picture

> [!note] Explicit Form of $QQ^T$
> If
>
> $$
> Q=
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix},
> $$
>
> then
>
> $$
> Q^T=
> \begin{bmatrix}
> - & q_1^T & -\\
> - & q_2^T & -\\
> & \vdots & \\
> - & q_n^T & -
> \end{bmatrix}.
> $$
>
> Hence
>
> $$
> QQ^T
> =
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix}
> \begin{bmatrix}
> - & q_1^T & -\\
> - & q_2^T & -\\
> & \vdots & \\
> - & q_n^T & -
> \end{bmatrix}.
> $$
>
> This expands as
>
> $$
> QQ^T
> =
> q_1q_1^T+q_2q_2^T+\cdots+q_nq_n^T.
> $$

---

# Connection to Gram-Schmidt and QR

> [!note] Projection Onto Column Space
> If
>
> $$
> A=
> \begin{bmatrix}
> | & | & & |\\
> a_1 & a_2 & \cdots & a_n\\
> | & | & & |
> \end{bmatrix}
> $$
>
> has full column rank, and Gram-Schmidt gives
>
> $$
> A=QR,
> $$
>
> then
>
> $$
> \operatorname{Col}(A)=\operatorname{Col}(Q).
> $$
>
> Therefore, the orthogonal projector onto
>
> $$
> \operatorname{Col}(A)
> $$
>
> is
>
> $$
> P=QQ^T.
> $$

> [!tip] Important
> For reduced QR with
>
> $$
> Q\in\mathbb{R}^{m\times n},
> \qquad m>n,
> $$
>
> we have
>
> $$
> Q^TQ=I_n,
> $$
>
> but
>
> $$
> QQ^T
> $$
>
> is not the identity.
>
> Instead,
>
> $$
> QQ^T
> $$
>
> is the projection matrix onto
>
> $$
> \operatorname{Col}(Q)=\operatorname{Col}(A).
> $$

---
