# Lecture 12 - Gram-Schmidt and Orthogonality, Projections

> [!info] Lecture Overview
> Topics:
>
> - Review of Gram-Schmidt
> - Reduced QR factorization
> - Classical Gram-Schmidt algorithm
> - Flop count of classical Gram-Schmidt
> - Stability issue of classical Gram-Schmidt
> - Modified Gram-Schmidt
> - Orthogonal matrices
> - Distance-preserving property
> - Projector matrices
> - Orthogonal projectors
> - Rank-one orthogonal projector

---

# Recall: Gram-Schmidt

## Setup

> [!note] Setup
> Let
>
> $$
> A=
> \begin{bmatrix}
> | & | & & |\\
> a_1 & a_2 & \cdots & a_n\\
> | & | & & |
> \end{bmatrix},
> \qquad
> a_i\in\mathbb{R}^m,
> \qquad
> m\ge n.
> $$
>
> We want to produce an orthonormal set
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
> such that
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

## First Vector

> [!note] First Gram-Schmidt Step
> We write
>
> $$
> a_1=r_{11}q_1.
> $$
>
> Since $q_1$ has unit length,
>
> $$
> r_{11}=\|a_1\|_2,
> \qquad
> q_1=\frac{a_1}{r_{11}}.
> $$
>
> Therefore,
>
> $$
> r_{11}=\|a_1\|_2,
> \qquad
> q_1=\frac{a_1}{\|a_1\|_2}.
> $$

---

## Second Vector

> [!note] Second Gram-Schmidt Step
> We write
>
> $$
> a_2=r_{12}q_1+r_{22}q_2.
> $$
>
> The coefficient in the $q_1$ direction is
>
> $$
> r_{12}=\langle a_2,q_1\rangle.
> $$
>
> Then remove this component:
>
> $$
> a_2-r_{12}q_1=r_{22}q_2.
> $$
>
> So
>
> $$
> r_{22}=\|a_2-r_{12}q_1\|_2,
> $$
>
> and
>
> $$
> q_2=
> \frac{a_2-r_{12}q_1}{r_{22}}.
> $$

---

## General Gram-Schmidt Step

> [!abstract] General Formula
> For each column $a_i$, write
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ii}q_i.
> $$
>
> For
>
> $$
> j=1,2,\ldots,i-1,
> $$
>
> compute
>
> $$
> r_{ji}=\langle a_i,q_j\rangle.
> $$
>
> Then compute
>
> $$
> r_{ii}
> =
> \left\|
> a_i-r_{1i}q_1-r_{2i}q_2-\cdots-r_{i-1,i}q_{i-1}
> \right\|_2.
> $$
>
> Finally,
>
> $$
> q_i
> =
> \frac{
> a_i-r_{1i}q_1-r_{2i}q_2-\cdots-r_{i-1,i}q_{i-1}
> }{
> r_{ii}
> }.
> $$

> [!tip] Projection Meaning
> The term
>
> $$
> r_{ji}q_j
> $$
>
> is the projection of $a_i$ onto the direction $q_j$.
>
> Since $q_j$ has unit length,
>
> $$
> r_{ji}q_j
> =
> \langle a_i,q_j\rangle q_j.
> $$

---

# QR Factorization from Gram-Schmidt

## Theorem

> [!abstract] Theorem
> The coefficients
>
> $$
> r_{ij},
> \qquad
> 1\le i\le j\le n,
> $$
>
> and the vectors
>
> $$
> q_1,q_2,\ldots,q_n
> $$
>
> obtained from Gram-Schmidt yield matrices
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
> and
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
> where $R$ is upper triangular with positive diagonal entries.
>
> If
>
> $$
> A=
> \begin{bmatrix}
> | & | & & |\\
> a_1 & a_2 & \cdots & a_n\\
> | & | & & |
> \end{bmatrix},
> $$
>
> then
>
> $$
> A=QR.
> $$

> [!success]- Proof
> From Gram-Schmidt, each column $a_i$ satisfies
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ii}q_i.
> $$
>
> Since
>
> $$
> r_{ji}=0
> \qquad
> \text{for } j>i,
> $$
>
> we can write this as
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ni}q_n.
> $$
>
> The $i$th column of $QR$ is
>
> $$
> Q
> \begin{bmatrix}
> r_{1i}\\
> r_{2i}\\
> \vdots\\
> r_{ni}
> \end{bmatrix}
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ni}q_n.
> $$
>
> Therefore, the $i$th column of $QR$ equals $a_i$.
>
> Since this is true for every column,
>
> $$
> A=QR.
> $$

---

# Classical Gram-Schmidt Algorithm

## Algorithm

> [!example] Classical Gram-Schmidt Algorithm
> MATLAB-style pseudocode:
>
> ```matlab
> function [Q,R] = classicalgs(A)
>     n = size(A,2);
>     for i = 1:n
>         Q(:,i) = A(:,i);
>         for j = 1:(i-1)
>             R(j,i) = A(:,i)' * Q(:,j);
>             Q(:,i) = Q(:,i) - R(j,i) * Q(:,j);
>         end
>         R(i,i) = norm(Q(:,i));
>         Q(:,i) = Q(:,i) / R(i,i);
>     end
> end
> ```

---

## Meaning of the Code

> [!note] Initialize Current Column
> The line
>
> ```matlab
> Q(:,i) = A(:,i);
> ```
>
> initializes the current working vector:
>
> $$
> Q(:,i)=a_i.
> $$

> [!note] Compute Projection Coefficient
> The line
>
> ```matlab
> R(j,i) = A(:,i)' * Q(:,j);
> ```
>
> computes the inner product
>
> $$
> r_{ji}=\langle a_i,q_j\rangle.
> $$
>
> This is the projection coefficient of $a_i$ onto $q_j$.

> [!note] Subtract Projection
> The line
>
> ```matlab
> Q(:,i) = Q(:,i) - R(j,i) * Q(:,j);
> ```
>
> subtracts
>
> $$
> r_{ji}q_j
> $$
>
> from the current vector.

> [!note] Normalize
> The line
>
> ```matlab
> R(i,i) = norm(Q(:,i));
> Q(:,i) = Q(:,i) / R(i,i);
> ```
>
> computes
>
> $$
> r_{ii}=\|Q(:,i)\|_2,
> $$
>
> and then normalizes:
>
> $$
> q_i=\frac{Q(:,i)}{r_{ii}}.
> $$

---

# Reduced QR Factorization

## Theorem

> [!abstract] Reduced QR Factorization
> Every full-rank matrix
>
> $$
> A\in\mathbb{R}^{m\times n},
> \qquad
> m\ge n,
> $$
>
> has a unique reduced QR factorization
>
> $$
> A=QR,
> $$
>
> where:
>
> $$
> Q\in\mathbb{R}^{m\times n}
> $$
>
> has orthonormal columns, and
>
> $$
> R\in\mathbb{R}^{n\times n}
> $$
>
> is upper triangular with positive diagonal entries.

> [!note] Matrix Shapes
> The reduced QR factorization has the shapes
>
> $$
> A_{m\times n}
> =
> Q_{m\times n}R_{n\times n}.
> $$
>
> Explicitly,
>
> $$
> A=
> \begin{bmatrix}
> | & | & & |\\
> a_1 & a_2 & \cdots & a_n\\
> | & | & & |
> \end{bmatrix},
> $$
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
> and
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

---

# Flop Count for Classical Gram-Schmidt

## Cost Setup

> [!note] Cost Per Column
> In the classical Gram-Schmidt algorithm, for each column
>
> $$
> i=1,2,\ldots,n,
> $$
>
> the inner loop runs over
>
> $$
> j=1,2,\ldots,i-1.
> $$
>
> Each inner loop step includes:
>
> - one inner product
> - one vector update

> [!note] Approximate Cost
> For vectors in
>
> $$
> \mathbb{R}^m,
> $$
>
> one inner product costs about
>
> $$
> 2m
> $$
>
> flops.
>
> One vector update also costs about
>
> $$
> 2m
> $$
>
> flops.
>
> Therefore, each inner loop step costs about
>
> $$
> 4m.
> $$

---

## Total Flop Count

> [!success]- Derivation
> For each fixed $i$, there are
>
> $$
> i-1
> $$
>
> inner loop steps.
>
> So the cost for column $i$ is approximately
>
> $$
> 4m(i-1).
> $$
>
> There are also normalization costs, which are lower order compared with the
> main inner-loop cost.
>
> The notes count the total as approximately
>
> $$
> \sum_{i=1}^{n}(4m(i-1)+3m+1).
> $$
>
> For leading-order behavior, focus on
>
> $$
> \sum_{i=1}^{n}4m(i-1).
> $$
>
> Compute:
>
> $$
> \sum_{i=1}^{n}4m(i-1)
> =
> 4m\sum_{i=1}^{n}(i-1).
> $$
>
> Since
>
> $$
> \sum_{i=1}^{n}(i-1)
> =
> 0+1+2+\cdots+(n-1)
> =
> \frac{n(n-1)}{2},
> $$
>
> we get
>
> $$
> 4m\sum_{i=1}^{n}(i-1)
> =
> 4m\cdot \frac{n(n-1)}{2}.
> $$
>
> Therefore,
>
> $$
> 4m\cdot \frac{n(n-1)}{2}
> =
> 2mn(n-1).
> $$
>
> Hence the leading term is
>
> $$
> 2mn^2.
> $$
>
> So classical Gram-Schmidt costs approximately
>
> $$
> \boxed{
> 2mn^2+O(mn)
> }.
> $$

> [!tip] Complexity
> The leading-order complexity is
>
> $$
> O(mn^2).
> $$

---

# Stability Issue of Classical Gram-Schmidt

## Issue

> [!warning] Issue
> Classical Gram-Schmidt is not stable.
>
> In fact, it can be unstable in floating point arithmetic.
>
> Therefore, a modification is required.

> [!note] Intuition
> Classical Gram-Schmidt computes the coefficients
>
> $$
> r_{ji}=\langle a_i,q_j\rangle
> $$
>
> using the original column
>
> $$
> a_i.
> $$
>
> Numerically, this can fail to remove components accurately when vectors are
> nearly linearly dependent.

---

# Modified Gram-Schmidt

## Main Idea

> [!note] Main Difference
> Instead of computing $R$ column by column using the original $a_i$, modified
> Gram-Schmidt updates the remaining columns row by row.
>
> Classical Gram-Schmidt conceptually does:
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ii}q_i.
> $$
>
> Modified Gram-Schmidt reorganizes the same operations in a more stable order.

---

## Before vs. Now

> [!note] Classical Gram-Schmidt Matrix Picture
> In classical Gram-Schmidt, we view
>
> $$
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
>
> The coefficients are obtained by projecting each $a_i$ onto earlier
> $q$-vectors.

> [!note] Modified Gram-Schmidt Matrix Picture
> In modified Gram-Schmidt, we update the columns progressively.
>
> The same factorization
>
> $$
> A=QR
> $$
>
> is produced, but the order of computation changes.
>
> The operation is the same algebraically, but more stable numerically.

---

## Modified Gram-Schmidt Algorithm

> [!example] Modified Gram-Schmidt Algorithm
> MATLAB-style pseudocode:
>
> ```matlab
> function [Q,R] = modifiedgs(A)
>     n = size(A,2);
>
>     for i = 1:n
>         Q(:,i) = A(:,i);
>     end
>
>     for i = 1:n
>         R(i,i) = norm(Q(:,i));
>         Q(:,i) = Q(:,i) / R(i,i);
>
>         for j = (i+1):n
>             R(i,j) = Q(:,i)' * A(:,j);
>             Q(:,j) = Q(:,j) - R(i,j) * Q(:,i);
>         end
>     end
> end
> ```

> [!warning] Important Detail
> In the handwritten notes, the inner product line is written using
>
> $$
> Q(:,i)'A(:,j).
> $$
>
> Conceptually, modified Gram-Schmidt removes the component from the current
> working column $Q(:,j)$.
>
> Many implementations write this line as
>
> $$
> R(i,j)=Q(:,i)^TQ(:,j),
> $$
>
> followed by
>
> $$
> Q(:,j)\leftarrow Q(:,j)-R(i,j)Q(:,i).
> $$

---

## Meaning of the Code

> [!note] Initialize Working Columns
> First copy the columns of $A$ into $Q$:
>
> $$
> Q(:,i)=A(:,i),
> \qquad
> i=1,\ldots,n.
> $$

> [!note] Normalize Current Column
> At step $i$, compute
>
> $$
> R(i,i)=\|Q(:,i)\|_2.
> $$
>
> Then normalize:
>
> $$
> Q(:,i)=\frac{Q(:,i)}{R(i,i)}.
> $$
>
> Now $Q(:,i)$ is the next orthonormal vector.

> [!note] Remove This Direction from Later Columns
> For every later column
>
> $$
> j=i+1,\ldots,n,
> $$
>
> compute
>
> $$
> R(i,j)=Q(:,i)^TQ(:,j),
> $$
>
> and update
>
> $$
> Q(:,j)\leftarrow Q(:,j)-R(i,j)Q(:,i).
> $$
>
> This removes the $q_i$ component from all remaining working columns.

---

## Flop Count of Modified Gram-Schmidt

> [!note] Cost
> Modified Gram-Schmidt uses the same set of arithmetic operations as classical
> Gram-Schmidt, but in a different order.
>
> Therefore, its flop count is approximately
>
> $$
> \boxed{
> 2mn^2
> }.
> $$
>
> More precisely:
>
> $$
> 2mn^2+O(mn).
> $$

> [!tip] Main Point
> Modified Gram-Schmidt has about the same cost as classical Gram-Schmidt, but
> it is usually more stable.

---

# Orthogonal Matrices

## Definition

> [!note] Definition: Orthogonal Matrix
> A matrix
>
> $$
> Q\in\mathbb{R}^{n\times n}
> $$
>
> is orthogonal if
>
> $$
> Q^TQ=QQ^T=I_n.
> $$
>
> Equivalently, $Q$ is square and has orthonormal columns.

> [!warning] Square Is Important
> The matrix must be square to be called orthogonal.
>
> If $Q\in\mathbb{R}^{m\times n}$ with
>
> $$
> m>n
> $$
>
> and orthonormal columns, then
>
> $$
> Q^TQ=I_n,
> $$
>
> but
>
> $$
> QQ^T\ne I_m.
> $$
>
> In that case, $Q$ is an isometry, not an orthogonal matrix.

---

## Distance-Preserving Property

> [!abstract] Crucial Property
> Orthogonal matrices preserve Euclidean length:
>
> $$
> \|Qx\|_2=\|x\|_2
> $$
>
> for all
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
> By definition of Euclidean norm,
>
> $$
> \|Qx\|_2^2
> =
> (Qx)^T(Qx).
> $$
>
> Rewrite:
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
> Hence
>
> $$
> x^TIx=x^Tx.
> $$
>
> So
>
> $$
> \|Qx\|_2^2=\|x\|_2^2.
> $$
>
> Taking square roots gives
>
> $$
> \|Qx\|_2=\|x\|_2.
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
> where
>
> $$
> Q
> $$
>
> is orthogonal and
>
> $$
> R
> $$
>
> is upper triangular with positive diagonal elements, then this is the square
> version of QR factorization.

---

# Projector Matrices

## Definition

> [!note] Definition: Projector Matrix
> A square matrix
>
> $$
> P
> $$
>
> is a projector matrix if
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
> A projector sends vectors onto a subspace.
>
> Applying the projector twice is the same as applying it once:
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

---

## Matrix Form

> [!note] Explicit Matrix Form
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
> uu^T
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
> Therefore,
>
> $$
> uu^T
> =
> \begin{bmatrix}
> u_1^2 & u_1u_2 & \cdots & u_1u_n\\
> u_2u_1 & u_2^2 & \cdots & u_2u_n\\
> \vdots & \vdots & \ddots & \vdots\\
> u_nu_1 & u_nu_2 & \cdots & u_n^2
> \end{bmatrix}.
> $$

---

## Proof

> [!success]- Proof
> We need to show that
>
> $$
> P=uu^T
> $$
>
> is an orthogonal projector.
>
> That means we need:
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
> First, check that $P$ projects $u$ to itself:
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
> Now let
>
> $$
> v\in\mathbb{R}^n
> $$
>
> satisfy
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
> By associativity,
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
> Pv=0.
> $$
>
> Next, show idempotence:
>
> $$
> P^2
> =
> (uu^T)(uu^T).
> $$
>
> Regroup:
>
> $$
> P^2
> =
> u(u^Tu)u^T.
> $$
>
> Since
>
> $$
> u^Tu=1,
> $$
>
> we get
>
> $$
> P^2=uu^T=P.
> $$
>
> Finally, show symmetry:
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
> we get
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

