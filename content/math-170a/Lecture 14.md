# Lecture 14 - Reflectors and Householder QR

> [!info] Lecture Overview
> Topics:
>
> - Householder reflectors
> - Geometric interpretation of reflections
> - How to construct a reflector that maps $x$ to $\|x\|_2 e_1$
> - Using reflectors to construct QR factorization
> - Full QR vs. economical / reduced QR
> - Computational cost of QR


---

# Householder Reflectors

## Definition

> [!note] Definition: Householder Reflector
> Let $u$ be a unit-norm vector, so
>
> $$
> \|u\|_2 = 1.
> $$
>
> Then
>
> $$
> Q = I - 2uu^T
> $$
>
> is a **Householder reflector**.
>
> If $u$ is not unit norm, then we can define
>
> $$
> Q = I - 2\frac{uu^T}{\|u\|_2^2}.
> $$

> [!tip] Intuition
> The matrix
>
> $$
> Q = I - 2uu^T
> $$
>
> reflects a vector across the subspace perpendicular to $u$.
>
> It flips the component in the $u$ direction and keeps the component
> perpendicular to $u$ unchanged.

---

# Important Properties of Reflectors

## Lemma

> [!abstract] Lemma: Facts about Reflectors
> Let
>
> $$
> Q = I - 2uu^T
> $$
>
> where $\|u\|_2 = 1$.
>
> Then:
>
> 1. $Qu = -u$
> 2. $Qv = v$ for all $v$ such that $v \perp u$
> 3. $Q^T = Q$
> 4. $Q^TQ = I$
>
> Therefore, $Q$ is both **symmetric** and **orthogonal**.

---

## Proof: $Qu=-u$

> [!success]- Proof
> Since $\|u\|_2=1$, we have
>
> $$
> u^Tu = 1.
> $$
>
> Then
>
> $$
> Qu = (I - 2uu^T)u
> $$
>
> $$
> = u - 2u(u^Tu)
> $$
>
> $$
> = u - 2u
> $$
>
> $$
> = -u.
> $$

---

## Proof: $Qv=v$ when $v\perp u$

> [!success]- Proof
> If $v\perp u$, then
>
> $$
> u^Tv = 0.
> $$
>
> Therefore,
>
> $$
> Qv = (I - 2uu^T)v
> $$
>
> $$
> = v - 2u(u^Tv)
> $$
>
> $$
> = v - 0
> $$
>
> $$
> = v.
> $$

---

## Proof: $Q^T=Q$

> [!success]- Proof
> Since
>
> $$
> Q = I - 2uu^T,
> $$
>
> we have
>
> $$
> Q^T = I^T - 2(uu^T)^T.
> $$
>
> Since $I^T=I$ and $(uu^T)^T=uu^T$,
>
> $$
> Q^T = I - 2uu^T = Q.
> $$

---

## Proof: $Q^TQ=I$

> [!success]- Proof
> Since $Q^T=Q$, it is enough to compute $Q^2$:
>
> $$
> Q^2 = (I - 2uu^T)(I - 2uu^T).
> $$
>
> Expanding:
>
> $$
> Q^2
> =
> I - 2uu^T - 2uu^T + 4uu^Tuu^T.
> $$
>
> Since $u^Tu=1$,
>
> $$
> uu^Tuu^T = u(u^Tu)u^T = uu^T.
> $$
>
> Thus,
>
> $$
> Q^2 = I - 4uu^T + 4uu^T = I.
> $$
>
> Therefore,
>
> $$
> Q^TQ=I.
> $$

---

# Geometric Interpretation

## Reflection Across a Subspace

> [!note] Geometric Interpretation
> A Householder reflector
>
> $$
> Q = I - 2uu^T
> $$
>
> reflects any vector $x$ across the subspace perpendicular to $u$ which is $$(\operatorname{span}\{u\})^\perp=
\{v \in \mathbb{R}^n \mid v^T u = 0\}$$
>
>if
> $$
> y = Qx,
> $$
>
> then
>
> $$
> y = (I - 2uu^T)x.
> $$
>
> Therefore,
>
> $$
> y = x - 2uu^Tx.
> $$

![[householder_geometric_interpretation.png]]

> [!tip] Intuition
> The term
>
> $$
> uu^Tx
> $$
>
> is the projection of $x$ onto the direction $u$.
>
> So
>
> $$
> x - 2uu^Tx
> $$
>
> subtracts twice the component of $x$ in the $u$ direction.
>
> This flips $x$ to the other side of the subspace perpendicular to $u$.

---

# Constructing a Reflector That Maps $x$ to $y$

## Lemma

> [!abstract] Lemma: Constructing a Householder Reflector
> Let
>
> $$
> x \in \mathbb{R}^n.
> $$
>
> Define
>
> $$
> y = \|x\|_2 e_1
> =
> \begin{bmatrix}
> \|x\|_2 \\
> 0 \\
> \vdots \\
> 0
> \end{bmatrix}.
> $$
>
> Let
>
> $$
> v = x-y
> $$
>
> and
>
> $$
> u = \frac{v}{\|v\|_2}.
> $$
>
> Then
>
> $$
> Q = I - 2uu^T
> $$
>
> has the property that
>
> $$
> Qx = y.
> $$

![[householder_construct_x_to_y.png]]

> [!warning] Special Case
> If
>
> $$
> v = 0,
> $$
>
> then $x=y$ already.
>
> In this case, we can simply take
>
> $$
> Q=I.
> $$

> [!tip] Why This Matters
> This is the key idea behind Householder QR.
>
> We choose a reflector that maps a column vector to a vector with zeros below
> the first entry.
>
> This is similar in goal to Gaussian elimination, but instead of using row
> operations, Householder QR uses orthogonal transformations.

---

# Using Reflectors to Construct QR

## Goal of QR

> [!note] Goal
> Given
>
> $$
> A \in \mathbb{R}^{m\times n},
> $$
>
> we want to construct
>
> $$
> A = QR,
> $$
>
> where:
>
> - $Q$ is orthogonal
> - $R$ is upper triangular if $A$ is square
> - $R$ is upper trapezoidal if $m>n$

---

## First Householder Step

> [!example] First Reflector
> Let the first column of $A$ be
>
> $$
> x = a_1.
> $$
>
> Define
>
> $$
> y = \|x\|_2e_1.
> $$
>
> Then set
>
> $$
> v = x-y,
> $$
>
> and
>
> $$
> u = \frac{v}{\|v\|_2}.
> $$
>
> The first Householder reflector is
>
> $$
> Q_1 = I - 2uu^T.
> $$

> [!tip] What $Q_1$ Does
> The reflector $Q_1$ is chosen so that
>
> $$
> Q_1a_1
> =
> \begin{bmatrix}
> \|a_1\|_2 \\
> 0 \\
> \vdots \\
> 0
> \end{bmatrix}.
> $$
>
> Therefore, $Q_1A$ has zeros below the first entry of the first column.

---

## Later Householder Steps

> [!note] General Step
> After the first reflector, we move to the submatrix below and to the right.
>
> For the second step, we construct a smaller reflector acting only on the
> remaining part of the matrix.
>
> Conceptually,
>
> $$
> Q_2 =
> \begin{bmatrix}
> 1 & 0 \\
> 0 & \widetilde Q_2
> \end{bmatrix},
> $$
>
> where $\widetilde Q_2$ is a smaller Householder reflector.

> [!tip] Pattern
> Each Householder reflector zeros out the entries below the diagonal in one
> column.
>
> After repeating this process,
>
> $$
> Q_n\cdots Q_2Q_1A
> $$
>
> becomes upper triangular or upper trapezoidal.

---

# QR Factorization from Reflectors

## Theorem

> [!abstract] Theorem: Householder QR
> Suppose the Householder reflectors satisfy
>
> $$
> Q_n \cdots Q_2Q_1A = R.
> $$
>
> Then
>
> $$
> A = Q_1^TQ_2^T \cdots Q_n^T R.
> $$
>
> Since each Householder reflector is symmetric,
>
> $$
> Q_i^T = Q_i.
> $$
>
> Therefore,
>
> $$
> A = QR,
> $$
>
> where
>
> $$
> Q = Q_1Q_2\cdots Q_n.
> $$

> [!warning] Common Mistake
> Be careful with the order of multiplication.
>
> During elimination, we apply reflectors as
>
> $$
> Q_n \cdots Q_2Q_1A = R.
> $$
>
> But when writing $A=QR$, the product appears as
>
> $$
> A = Q_1^TQ_2^T\cdots Q_n^TR.
> $$

---

# Full QR and Reduced QR

## Full QR

> [!note] Full QR
> For
>
> $$
> A \in \mathbb{R}^{m\times n},
> $$
>
> the full QR factorization is
>
> $$
> A = QR,
> $$
>
> where
>
> $$
> Q \in \mathbb{R}^{m\times m}
> $$
>
> and
>
> $$
> R \in \mathbb{R}^{m\times n}.
> $$

> [!tip] Shape of Full QR
> In full QR:
>
> $$
> A_{m\times n}
> =
> Q_{m\times m}R_{m\times n}.
> $$

![[Full QR.png]]

--- 

## Economical / Reduced QR

> [!note] Economical / Reduced QR
> The economical, condensed, or reduced QR factorization is
>
> $$
> A = QR,
> $$
>
> where
>
> $$
> Q \in \mathbb{R}^{m\times n}
> $$
>
> and
>
> $$
> R \in \mathbb{R}^{n\times n}.
> $$

> [!tip] Shape of Reduced QR
> In reduced QR:
>
> $$
> A_{m\times n}
> =
> Q_{m\times n}R_{n\times n}.
> $$
>
> This keeps only the columns of $Q$ that are needed to reconstruct $A$.

![[Economic QR.png]]

---

## Relationship Between Full and Reduced QR

> [!abstract] Relationship
> Suppose
>
> $$
> Q_{\text{full}} = [Q_1 \; Q_2]
> $$
>
> and
>
> $$
> \widetilde R =
> \begin{bmatrix}
> R \\
> 0
> \end{bmatrix}.
> $$
>
> Then
>
> $$
> A
> =
> Q_{\text{full}}\widetilde R
> =
> [Q_1 \; Q_2]
> \begin{bmatrix}
> R \\
> 0
> \end{bmatrix}.
> $$
>
> Multiplying gives
>
> $$
> A = Q_1R.
> $$
>
> Therefore, reduced QR uses
>
> $$
> Q = Q_1.
> $$

---

# Computational Cost

## Cost of Full QR

> [!note] Cost of Full QR
> The lecture notes give the cost of forming QR as approximately
>
> $$
> 2mn^2 - \frac{2}{3}n^3.
> $$
> For a square matrix, where $m=n$, this becomes approximately
> $$
> 2n^3-\frac{2}{3}n^3=\frac{4}{3}n^3.
> $$

---

## Cost of Reduced QR

> [!note] Cost of Reduced QR
> The economical or reduced QR factorization costs approximately
>
> $$
> 2mn^2.
> $$
>
> For a square matrix, where $m=n$, this becomes approximately
>
> $$
> 2n^3.
> $$

> [!warning] Practical Point
> In practice, we usually do **not** explicitly form the full matrix $Q$.
>
> Instead, we store the Householder vectors for each step.

---
## Example: Householder QR Decomposition

> [!example] Example: Find the QR decomposition using Householder reflectors
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & -1\\
> 1 & 5\\
> 1 & 5\\
> 1 & -1
> \end{bmatrix}.
> $$
>
> We want to find the full QR decomposition of $A$ using Householder reflectors.

> [!success]- Solution
> ### Step 1: First Householder Reflector
>
> Take the first column of $A$:
>
> $$
> x=
> \begin{bmatrix}
> 1\\
> 1\\
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Its norm is
>
> $$
> \|x\|_2
> =
> \sqrt{1^2+1^2+1^2+1^2}
> =
> 2.
> $$
>
> Following the lecture method, choose
>
> $$
> y=\|x\|_2e_1
> =
> \begin{bmatrix}
> 2\\
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> Define
>
> $$
> v_1=x-y.
> $$
>
> Then
>
> $$
> v_1=
> \begin{bmatrix}
> 1\\
> 1\\
> 1\\
> 1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 2\\
> 0\\
> 0\\
> 0
> \end{bmatrix}
> =
> \begin{bmatrix}
> -1\\
> 1\\
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Its norm is
>
> $$
> \|v_1\|_2
> =
> \sqrt{(-1)^2+1^2+1^2+1^2}
> =
> 2.
> $$
>
> Therefore,
>
> $$
> u_1
> =
> \frac{v_1}{\|v_1\|_2}
> =
> \frac12
> \begin{bmatrix}
> -1\\
> 1\\
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> The first Householder reflector is
>
> $$
> Q_1=I-2u_1u_1^T.
> $$
>
> Since
>
> $$
> u_1=
> \frac12
> \begin{bmatrix}
> -1\\
> 1\\
> 1\\
> 1
> \end{bmatrix},
> $$
>
> we get
>
> $$
> Q_1=
> \begin{bmatrix}
> \frac12 & \frac12 & \frac12 & \frac12\\
> \frac12 & \frac12 & -\frac12 & -\frac12\\
> \frac12 & -\frac12 & \frac12 & -\frac12\\
> \frac12 & -\frac12 & -\frac12 & \frac12
> \end{bmatrix}.
> $$
>
> Now compute
>
> $$
> Q_1A.
> $$
>
> This gives
>
> $$
> Q_1A
> =
> \begin{bmatrix}
> 2 & 4\\
> 0 & 0\\
> 0 & 0\\
> 0 & -6
> \end{bmatrix}.
> $$
>
> The first column now has zeros below the first entry.
>
> ---
>
> ### Step 2: Second Householder Reflector
>
> Now look at the lower part of the second column:
>
> $$
> x=
> \begin{bmatrix}
> 0\\
> 0\\
> -6
> \end{bmatrix}.
> $$
>
> Its norm is
>
> $$
> \|x\|_2=6.
> $$
>
> Choose
>
> $$
> y=\|x\|_2e_1
> =
> \begin{bmatrix}
> 6\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> Define
>
> $$
> v_2=x-y.
> $$
>
> Then
>
> $$
> v_2=
> \begin{bmatrix}
> 0\\
> 0\\
> -6
> \end{bmatrix}
> -
> \begin{bmatrix}
> 6\\
> 0\\
> 0
> \end{bmatrix}
> =
> \begin{bmatrix}
> -6\\
> 0\\
> -6
> \end{bmatrix}.
> $$
>
> Its norm is
>
> $$
> \|v_2\|_2
> =
> \sqrt{(-6)^2+0^2+(-6)^2}
> =
> 6\sqrt2.
> $$
>
> Therefore,
>
> $$
> u_2
> =
> \frac{v_2}{\|v_2\|_2}
> =
> \frac{1}{\sqrt2}
> \begin{bmatrix}
> -1\\
> 0\\
> -1
> \end{bmatrix}.
> $$
>
> On the lower $3\times 3$ block, define
>
> $$
> \widetilde Q_2
> =
> I-2u_2u_2^T.
> $$
>
> Since
>
> $$
> u_2=
> \frac{1}{\sqrt2}
> \begin{bmatrix}
> -1\\
> 0\\
> -1
> \end{bmatrix},
> $$
>
> we get
>
> $$
> \widetilde Q_2
> =
> \begin{bmatrix}
> 0 & 0 & -1\\
> 0 & 1 & 0\\
> -1 & 0 & 0
> \end{bmatrix}.
> $$
>
> Embed this into a $4\times 4$ matrix:
>
> $$
> Q_2=
> \begin{bmatrix}
> 1 & 0 & 0 & 0\\
> 0 & 0 & 0 & -1\\
> 0 & 0 & 1 & 0\\
> 0 & -1 & 0 & 0
> \end{bmatrix}.
> $$
>
> Now compute
>
> $$
> Q_2Q_1A.
> $$
>
> We get
>
> $$
> Q_2Q_1A
> =
> \begin{bmatrix}
> 2 & 4\\
> 0 & 6\\
> 0 & 0\\
> 0 & 0
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> R=
> \begin{bmatrix}
> 2 & 4\\
> 0 & 6\\
> 0 & 0\\
> 0 & 0
> \end{bmatrix}.
> $$
>
> ---
>
> ### Step 3: Find $Q$
>
> From the Householder process,
>
> $$
> Q_2Q_1A=R.
> $$
>
> So
>
> $$
> A=Q_1^TQ_2^TR.
> $$
>
> Since Householder reflectors are symmetric,
>
> $$
> Q_1^T=Q_1,
> \qquad
> Q_2^T=Q_2.
> $$
>
> Therefore,
>
> $$
> A=Q_1Q_2R.
> $$
>
> Thus,
>
> $$
> Q=Q_1Q_2.
> $$
>
> Multiplying gives
>
> $$
> Q=
> \begin{bmatrix}
> \frac12 & -\frac12 & \frac12 & -\frac12\\
> \frac12 & \frac12 & -\frac12 & -\frac12\\
> \frac12 & \frac12 & \frac12 & \frac12\\
> \frac12 & -\frac12 & -\frac12 & \frac12
> \end{bmatrix}.
> $$
>
> Therefore, the full QR decomposition is
>
> $$
> A=QR,
> $$
>
> where
>
> $$
> Q=
> \begin{bmatrix}
> \frac12 & -\frac12 & \frac12 & -\frac12\\
> \frac12 & \frac12 & -\frac12 & -\frac12\\
> \frac12 & \frac12 & \frac12 & \frac12\\
> \frac12 & -\frac12 & -\frac12 & \frac12
> \end{bmatrix},
> $$
>
> and
>
> $$
> R=
> \begin{bmatrix}
> 2 & 4\\
> 0 & 6\\
> 0 & 0\\
> 0 & 0
> \end{bmatrix}.
> $$
>
> ---
>
> ### Reduced QR
>
> The reduced QR decomposition keeps only the first two columns of $Q$ and
> the first two rows of $R$.
>
> Thus,
>
> $$
> Q_{\text{red}}
> =
> \begin{bmatrix}
> \frac12 & -\frac12\\
> \frac12 & \frac12\\
> \frac12 & \frac12\\
> \frac12 & -\frac12
> \end{bmatrix},
> $$
>
> and
>
> $$
> R_{\text{red}}
> =
> \begin{bmatrix}
> 2 & 4\\
> 0 & 6
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> A=Q_{\text{red}}R_{\text{red}}.
> $$




