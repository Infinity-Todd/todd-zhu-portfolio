# Lecture 11 - Perturbation Theory, Orthogonality, Gram-Schmidt

> [!info] Lecture Overview
> Topics:
>
> - Finish matrix perturbation theory
> - Invertibility of $A+\delta A$
> - Condition number as distance to singularity
> - Perturbation theorem when error is in $A$
> - Perturbation theorem when both $A$ and $b$ have error
> - Orthogonality
> - Orthogonal and orthonormal vectors
> - Gram-Schmidt procedure
> - Classical Gram-Schmidt algorithm
> - QR factorization from Gram-Schmidt

---

# Recall from Last Time

## Invertibility Under Matrix Perturbation

> [!abstract] Lemma
> Let
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> be nonsingular, and let
>
> $$
> \delta A\in\mathbb{R}^{n\times n}.
> $$
>
> If
>
> $$
> \frac{\|\delta A\|}{\|A\|}
> <
> \frac1{\kappa_{\|\cdot\|}(A)}
> $$
>
> in an induced matrix norm, then
>
> $$
> A+\delta A
> $$
>
> is invertible.

> [!success]- Proof
> We prove by contradiction.
>
> Assume
>
> $$
> A+\delta A
> $$
>
> is not invertible.
>
> Then there exists a nonzero vector
>
> $$
> y\in\mathbb{R}^n,
> \qquad
> y\ne 0,
> $$
>
> such that
>
> $$
> (A+\delta A)y=0.
> $$
>
> Expand:
>
> $$
> Ay+\delta Ay=0.
> $$
>
> Therefore,
>
> $$
> Ay=-\delta Ay.
> $$
>
> Multiply both sides by $A^{-1}$:
>
> $$
> y=-A^{-1}\delta Ay.
> $$
>
> Take norms:
>
> $$
> \|y\|
> =
> \|-A^{-1}\delta Ay\|.
> $$
>
> Since the norm ignores the negative sign,
>
> $$
> \|y\|
> =
> \|A^{-1}\delta Ay\|.
> $$
>
> Use submultiplicativity:
>
> $$
> \|A^{-1}\delta Ay\|
> \le
> \|A^{-1}\|\|\delta A\|\|y\|.
> $$
>
> Thus
>
> $$
> \|y\|
> \le
> \|A^{-1}\|\|\delta A\|\|y\|.
> $$
>
> Since
>
> $$
> y\ne 0,
> $$
>
> we have
>
> $$
> \|y\|>0.
> $$
>
> Divide both sides by $\|y\|$:
>
> $$
> 1
> \le
> \|A^{-1}\|\|\delta A\|.
> $$
>
> Rearrange:
>
> $$
> \frac1{\|A^{-1}\|}
> \le
> \|\delta A\|.
> $$
>
> Divide both sides by $\|A\|$:
>
> $$
> \frac1{\|A\|\|A^{-1}\|}
> \le
> \frac{\|\delta A\|}{\|A\|}.
> $$
>
> Since
>
> $$
> \kappa_{\|\cdot\|}(A)
> =
> \|A\|\|A^{-1}\|,
> $$
>
> we get
>
> $$
> \frac1{\kappa_{\|\cdot\|}(A)}
> \le
> \frac{\|\delta A\|}{\|A\|}.
> $$
>
> This contradicts the assumption
>
> $$
> \frac{\|\delta A\|}{\|A\|}
> <
> \frac1{\kappa_{\|\cdot\|}(A)}.
> $$
>
> Therefore,
>
> $$
> A+\delta A
> $$
>
> must be invertible.

---

## Condition Number and Distance to Singularity

> [!note] Remark
> The condition number does more than control error amplification.
>
> It also measures distance to the nearest singular matrix.
>
> If $A$ is invertible and $B$ is not invertible, then for any induced matrix
> norm,
>
> $$
> \frac{\|A-B\|}{\|A\|}
> \ge
> \frac1{\kappa_{\|\cdot\|}(A)}.
> $$

> [!tip] Meaning
> If
>
> $$
> \kappa_{\|\cdot\|}(A)
> $$
>
> is large, then
>
> $$
> \frac1{\kappa_{\|\cdot\|}(A)}
> $$
>
> is small.
>
> So $A$ can be very close to a singular matrix.
>
> This is another reason large condition number means ill-conditioned.

> [!note] Special Note
> This bound is exact for induced $2$-norms.
>
> We will see this later.

---

# Perturbation in the Matrix $A$

## Setup

> [!note] Matrix Perturbation Setup
> Now suppose the right-hand side $b$ is exact, but the matrix $A$ has error.
>
> Instead of solving
>
> $$
> Ax=b,
> $$
>
> we solve
>
> $$
> (A+\delta A)\widehat{x}=b.
> $$
>
> Here
>
> $$
> \delta A
> $$
>
> is a small perturbation matrix.
>
> The computed solution is
>
> $$
> \widehat{x}=x+\delta x.
> $$

---

## Theorem

> [!abstract] Perturbation Theorem: Error in $A$
> Suppose $A$ is nonsingular,
>
> $$
> b\ne 0,
> $$
>
> and $x$ and $\widehat{x}=x+\delta x$ solve
>
> $$
> Ax=b
> $$
>
> and
>
> $$
> (A+\delta A)\widehat{x}=b,
> $$
>
> respectively.
>
> Then, for any induced norm,
>
> $$
> \boxed{
> \frac{\|\delta x\|}{\|\widehat{x}\|}
> \le
> \kappa_{\|\cdot\|}(A)
> \frac{\|\delta A\|}{\|A\|}
> }.
> $$
>
> Here:
>
> $$
> \frac{\|\delta x\|}{\|\widehat{x}\|}
> $$
>
> is the relative error in the computed solution, and
>
> $$
> \frac{\|\delta A\|}{\|A\|}
> $$
>
> is the relative error in $A$.

---

## Proof

> [!success]- Proof
> Start with the two systems:
>
> $$
> (A+\delta A)\widehat{x}=b
> $$
>
> and
>
> $$
> Ax=b.
> $$
>
> Since
>
> $$
> \widehat{x}=x+\delta x,
> $$
>
> subtract the exact equation from the perturbed equation:
>
> $$
> (A+\delta A)\widehat{x}-Ax=0.
> $$
>
> Expand:
>
> $$
> A\widehat{x}+\delta A\widehat{x}-Ax=0.
> $$
>
> Since
>
> $$
> \widehat{x}=x+\delta x,
> $$
>
> we have
>
> $$
> A\widehat{x}-Ax
> =
> A(\widehat{x}-x)
> =
> A\delta x.
> $$
>
> Therefore,
>
> $$
> A\delta x+\delta A\widehat{x}=0.
> $$
>
> Rearrange:
>
> $$
> A\delta x=-\delta A\widehat{x}.
> $$
>
> Multiply both sides by $A^{-1}$:
>
> $$
> \delta x=-A^{-1}\delta A\widehat{x}.
> $$
>
> Take norms:
>
> $$
> \|\delta x\|
> =
> \|-A^{-1}\delta A\widehat{x}\|.
> $$
>
> Since the norm ignores the negative sign,
>
> $$
> \|\delta x\|
> =
> \|A^{-1}\delta A\widehat{x}\|.
> $$
>
> Use submultiplicativity:
>
> $$
> \|\delta x\|
> \le
> \|A^{-1}\|\|\delta A\|\|\widehat{x}\|.
> $$
>
> Divide by
>
> $$
> \|\widehat{x}\|.
> $$
>
> Then
>
> $$
> \frac{\|\delta x\|}{\|\widehat{x}\|}
> \le
> \|A^{-1}\|\|\delta A\|.
> $$
>
> Multiply and divide by $\|A\|$:
>
> $$
> \frac{\|\delta x\|}{\|\widehat{x}\|}
> \le
> \|A\|\|A^{-1}\|
> \frac{\|\delta A\|}{\|A\|}.
> $$
>
> Since
>
> $$
> \kappa_{\|\cdot\|}(A)
> =
> \|A\|\|A^{-1}\|,
> $$
>
> we get
>
> $$
> \boxed{
> \frac{\|\delta x\|}{\|\widehat{x}\|}
> \le
> \kappa_{\|\cdot\|}(A)
> \frac{\|\delta A\|}{\|A\|}
> }.
> $$

---

## Remark: Perturbing Both $A$ and $b$

> [!note] Both $A$ and $b$ Are Perturbed
> When both $A$ and $b$ are perturbed by
>
> $$
> \delta A
> $$
>
> and
>
> $$
> \delta b,
> $$
>
> we get a similar bound:
>
> $$
> \frac{\|\delta x\|}{\|\widehat{x}\|}
> \le
> \kappa_{\|\cdot\|}(A)
> \left(
> \frac{\|\delta A\|}{\|A\|}
> +
> \frac{\|\delta b\|}{\|b\|}
> +
> \frac{\|\delta b\|}{\|b\|}
> \frac{\|\delta A\|}{\|A\|}
> \right).
> $$

> [!warning] Floating Point Arithmetic
> This still does not take into account floating point arithmetic error.
>
> These perturbation results only describe errors caused by noisy data.
>
> Once we solve systems in floating point arithmetic, additional numerical
> errors are introduced.

---

# Orthogonality

## Dot Product

> [!note] Recall: Dot Product
> For vectors
>
> $$
> u,v\in\mathbb{R}^n,
> $$
>
> the dot product is
>
> $$
> u\cdot v
> =
> u^Tv
> =
> \langle u,v\rangle
> =
> \sum_{i=1}^n u_iv_i.
> $$

> [!tip] Geometric Interpretation
> The dot product also satisfies
>
> $$
> u\cdot v
> =
> \|u\|_2\|v\|_2\cos\theta,
> $$
>
> where $\theta$ is the angle between $u$ and $v$.

---

## Orthogonal Vectors

> [!note] Definition: Orthogonal
> Two vectors
>
> $$
> u,v\in\mathbb{R}^n
> $$
>
> are orthogonal if
>
> $$
> u\cdot v=0.
> $$
>
> Equivalently,
>
> $$
> \langle u,v\rangle=0.
> $$
>
> We write
>
> $$
> u\perp v.
> $$

> [!tip] Meaning
> Orthogonal means perpendicular with respect to this inner product.

---

## Orthogonal Set

> [!note] Definition: Orthogonal Set
> A set of vectors
>
> $$
> \{x_1,x_2,\ldots,x_n\}
> $$
>
> is orthogonal if
>
> $$
> \langle x_i,x_j\rangle=0
> \qquad
> \text{for all } i\ne j.
> $$

---

## Orthonormal Set

> [!note] Definition: Orthonormal Set
> A set of vectors
>
> $$
> \{x_1,x_2,\ldots,x_n\}
> $$
>
> is orthonormal if
>
> $$
> \langle x_i,x_j\rangle
> =
> \begin{cases}
> 0, & i\ne j,\\
> 1, & i=j.
> \end{cases}
> $$
>
> Equivalently:
>
> - different vectors are orthogonal
> - each vector has length $1$

> [!note] Recall
> For the Euclidean norm,
>
> $$
> \langle x_i,x_i\rangle
> =
> \|x_i\|_2^2.
> $$
>
> So if
>
> $$
> \langle x_i,x_i\rangle=1,
> $$
>
> then
>
> $$
> \|x_i\|_2=1.
> $$

---

# Gram-Schmidt Procedure

## Goal

> [!note] Goal of Gram-Schmidt
> Suppose we start with a linearly independent set of vectors
>
> $$
> \{a_1,a_2,\ldots,a_n\}
> \subset \mathbb{R}^m,
> \qquad
> n\le m.
> $$
>
> Gram-Schmidt produces an orthonormal set
>
> $$
> \{q_1,q_2,\ldots,q_n\}
> \subset \mathbb{R}^m
> $$
>
> such that the spans match step by step:
>
> $$
> \operatorname{span}\{a_1\}
> =
> \operatorname{span}\{q_1\},
> $$
>
> $$
> \operatorname{span}\{a_1,a_2\}
> =
> \operatorname{span}\{q_1,q_2\},
> $$
>
> and in general,
>
> $$
> \operatorname{span}\{a_1,a_2,\ldots,a_i\}
> =
> \operatorname{span}\{q_1,q_2,\ldots,q_i\},
> $$
>
> for all
>
> $$
> 1\le i\le n.
> $$

> [!tip] Meaning
> Gram-Schmidt produces an orthonormal basis for the same space, given any
> linearly independent basis to start with.

---

## Gram-Schmidt Setup

> [!note] Linear Combination Form
> Gram-Schmidt constructs vectors $q_i$ and coefficients $r_{ij}$ so that
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ii}q_i.
> $$
>
> In particular:
>
> $$
> a_1=r_{11}q_1,
> $$
>
> $$
> a_2=r_{12}q_1+r_{22}q_2,
> $$
>
> and generally,
>
> $$
> a_i=r_{1i}q_1+r_{2i}q_2+\cdots+r_{ii}q_i.
> $$

---

# First Vector

> [!success]- Derivation for $q_1$
> Start with
>
> $$
> a_1=r_{11}q_1.
> $$
>
> Since $q_1$ should have length $1$,
>
> $$
> \|q_1\|_2=1.
> $$
>
> Take norms:
>
> $$
> \|a_1\|_2
> =
> \|r_{11}q_1\|_2.
> $$
>
> Since
>
> $$
> \|r_{11}q_1\|_2
> =
> |r_{11}|\|q_1\|_2,
> $$
>
> and
>
> $$
> \|q_1\|_2=1,
> $$
>
> we get
>
> $$
> \|a_1\|_2=|r_{11}|.
> $$
>
> The convention is to choose
>
> $$
> r_{11}>0.
> $$
>
> Therefore,
>
> $$
> r_{11}=\|a_1\|_2.
> $$
>
> Then
>
> $$
> q_1=\frac{a_1}{\|a_1\|_2}.
> $$

> [!abstract] First Step Formula
> $$
> r_{11}=\|a_1\|_2,
> \qquad
> q_1=\frac{a_1}{r_{11}}.
> $$

---

# Second Vector

> [!success]- Derivation for $q_2$
> We write
>
> $$
> a_2=r_{12}q_1+r_{22}q_2.
> $$
>
> Take inner product with $q_1$:
>
> $$
> \langle a_2,q_1\rangle
> =
> \langle r_{12}q_1+r_{22}q_2,q_1\rangle.
> $$
>
> Distribute:
>
> $$
> \langle a_2,q_1\rangle
> =
> r_{12}\langle q_1,q_1\rangle
> +
> r_{22}\langle q_2,q_1\rangle.
> $$
>
> Because the $q_i$ are orthonormal,
>
> $$
> \langle q_1,q_1\rangle=1,
> $$
>
> and
>
> $$
> \langle q_2,q_1\rangle=0.
> $$
>
> Therefore,
>
> $$
> \langle a_2,q_1\rangle=r_{12}.
> $$
>
> So
>
> $$
> r_{12}=\langle a_2,q_1\rangle.
> $$
>
> Now subtract off the part of $a_2$ in the $q_1$ direction:
>
> $$
> a_2-r_{12}q_1=r_{22}q_2.
> $$
>
> Take norms:
>
> $$
> \|a_2-r_{12}q_1\|_2
> =
> \|r_{22}q_2\|_2.
> $$
>
> Since $\|q_2\|_2=1$ and $r_{22}>0$,
>
> $$
> r_{22}
> =
> \|a_2-r_{12}q_1\|_2.
> $$
>
> Therefore,
>
> $$
> q_2
> =
> \frac{a_2-r_{12}q_1}{r_{22}}.
> $$

> [!abstract] Second Step Formula
> $$
> r_{12}=\langle a_2,q_1\rangle,
> $$
>
> $$
> r_{22}=\|a_2-r_{12}q_1\|_2,
> $$
>
> $$
> q_2=\frac{a_2-r_{12}q_1}{r_{22}}.
> $$

---

# General Gram-Schmidt Step

> [!abstract] General Formula
> For each
>
> $$
> i=1,2,\ldots,n,
> $$
>
> first subtract off projections onto the previous $q_j$:
>
> $$
> r_{ji}
> =
> \langle a_i,q_j\rangle,
> \qquad
> j=1,\ldots,i-1.
> $$
>
> Define
>
> $$
> \widetilde q_i
> =
> a_i-\sum_{j=1}^{i-1}r_{ji}q_j.
> $$
>
> Then set
>
> $$
> r_{ii}
> =
> \|\widetilde q_i\|_2,
> $$
>
> and normalize:
>
> $$
> q_i
> =
> \frac{\widetilde q_i}{r_{ii}}.
> $$

> [!note] Positive Diagonal Convention
> We choose
>
> $$
> r_{ii}>0.
> $$
>
> This makes the QR factorization unique for full-rank matrices.

---

# QR Factorization from Gram-Schmidt

## Matrix Form

> [!abstract] Theorem
> The coefficients $r_{ij}$ and vectors $q_1,q_2,\ldots,q_n$ obtained by
> Gram-Schmidt yield matrices
>
> $$
> Q=
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix}
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
> From the construction of Gram-Schmidt, each column $a_i$ satisfies
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ii}q_i.
> $$
>
> Since $r_{ji}=0$ for $j>i$, we can also write
>
> $$
> a_i
> =
> r_{1i}q_1+r_{2i}q_2+\cdots+r_{ni}q_n.
> $$
>
> The $i$th column of
>
> $$
> QR
> $$
>
> is exactly
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

> [!example] Classical Gram-Schmidt Algorithm
> MATLAB-style pseudocode:
>
> ```matlab
> function [Q,R] = classicalgs(A)
>     n = size(A,2);
>
>     for i = 1:n
>         Q(:,i) = A(:,i);
>
>         for j = 1:(i-1)
>             R(j,i) = A(:,i)' * Q(:,j);
>             Q(:,i) = Q(:,i) - R(j,i)*Q(:,j);
>         end
>
>         R(i,i) = norm(Q(:,i));
>         Q(:,i) = Q(:,i)/R(i,i);
>     end
> end
> ```

---

## Meaning of the Code

> [!note] Start With Column $a_i$
> The line
>
> ```matlab
> Q(:,i) = A(:,i);
> ```
>
> starts with the current input column:
>
> $$
> Q(:,i)=a_i.
> $$

> [!note] Compute Projection Coefficients
> The line
>
> ```matlab
> R(j,i) = A(:,i)' * Q(:,j);
> ```
>
> computes
>
> $$
> r_{ji}=\langle a_i,q_j\rangle.
> $$

> [!note] Subtract Projection
> The line
>
> ```matlab
> Q(:,i) = Q(:,i) - R(j,i)*Q(:,j);
> ```
>
> subtracts the component of $a_i$ in the direction of $q_j$:
>
> $$
> Q(:,i)\leftarrow Q(:,i)-r_{ji}q_j.
> $$

> [!note] Normalize
> The line
>
> ```matlab
> R(i,i) = norm(Q(:,i));
> Q(:,i) = Q(:,i)/R(i,i);
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

> [!abstract] Theorem
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
> The reduced QR factorization has shapes:
>
> $$
> A=
> \begin{bmatrix}
> | & | & & |\\
> a_1 & a_2 & \cdots & a_n\\
> | & | & & |
> \end{bmatrix}_{m\times n},
> $$
>
> $$
> Q=
> \begin{bmatrix}
> | & | & & |\\
> q_1 & q_2 & \cdots & q_n\\
> | & | & & |
> \end{bmatrix}_{m\times n},
> $$
>
> $$
> R=
> \begin{bmatrix}
> r_{11} & r_{12} & \cdots & r_{1n}\\
> 0 & r_{22} & \cdots & r_{2n}\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & r_{nn}
> \end{bmatrix}_{n\times n}.
> $$

---

