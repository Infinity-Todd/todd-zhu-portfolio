# Lecture 21 - Schur and Eigenvalue Decompositions; Power Method

> [!info] Lecture Overview
> Topics:
>
> - Recall Schur decomposition
> - Eigenvalues from Schur form
> - Hermitian matrices
> - Normal matrices
> - Eigenvalue decompositions
> - Spectral theorem
> - Power method
> - Normalization in power method
> - MATLAB code for power method

---

# Recall: Schur Decomposition

## Schur Decomposition

> [!note] Schur Decomposition
> Any
>
> $$
> n\times n
> $$
>
> matrix, real or complex, can be factored as
>
> $$
> A=UTU^*,
> $$
>
> where
>
> $$
> U^*U=UU^*=I,
> $$
>
> so $U$ is unitary, and $T$ is upper triangular.
>
> If $A$ is real, then $T$ may still be complex.

> [!note] Matrix Form
> The Schur form looks like
>
> $$
> A
> =
> U
> \begin{bmatrix}
> \lambda_1 & * & * & \cdots & *\\
> 0 & \lambda_2 & * & \cdots & *\\
> 0 & 0 & \lambda_3 & \cdots & *\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}
> U^*.
> $$
>
> The eigenvalues of $A$ appear on the diagonal of $T$:
>
> $$
> \lambda_1,\lambda_2,\ldots,\lambda_n.
> $$

---

## Eigenvalues from Schur Form

> [!note] Important Fact
> The matrices $A$ and $T$ are similar.
>
> Since
>
> $$
> A=UTU^*,
> $$
>
> and
>
> $$
> U^*=U^{-1},
> $$
>
> this means
>
> $$
> T=U^*AU.
> $$
>
> Therefore, $A$ and $T$ have the same eigenvalues.

> [!tip] Why the Eigenvalues Are on the Diagonal
> Since $T$ is upper triangular,
>
> $$
> T=
> \begin{bmatrix}
> t_{11} & t_{12} & \cdots & t_{1n}\\
> 0 & t_{22} & \cdots & t_{2n}\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & t_{nn}
> \end{bmatrix},
> $$
>
> we have
>
> $$
> \det(\lambda I-T)
> =
> (\lambda-t_{11})(\lambda-t_{22})\cdots(\lambda-t_{nn}).
> $$
>
> Therefore, the eigenvalues of $T$ are the diagonal entries:
>
> $$
> t_{11},t_{22},\ldots,t_{nn}.
> $$
>
> Since $A$ and $T$ are similar, the eigenvalues of $A$ are also the diagonal
> entries of $T$.

---

## Important Note

> [!warning] Note
> In general, the columns of $U$ in the Schur decomposition are **not**
> eigenvectors of $A$.
>
> This is because $T$ is usually upper triangular, not diagonal.

> [!tip] Exception
> If $T$ is diagonal, then the columns of $U$ are eigenvectors of $A$.
>
> In that case, Schur decomposition becomes an eigenvalue decomposition.

---

# Exceptions: Hermitian and Symmetric Matrices

## Hermitian Matrices

> [!abstract] Corollary
> If
>
> $$
> A=A^*,
> $$
>
> then $A$ is called **Hermitian**.
>
> If $A$ is Hermitian, then:
>
> - $A$ has all real eigenvalues
> - $A$ has possibly complex orthonormal eigenvectors

> [!note] Real Symmetric Case
> If
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> and
>
> $$
> A=A^T,
> $$
>
> then $A$ is real symmetric.
>
> In this case:
>
> - $A$ has all real eigenvalues
> - $A$ has real orthonormal eigenvectors

> [!success]- Sketch of Proof: Why Hermitian Matrices Have Real Eigenvalues
> Start with the Schur decomposition:
>
> $$
> A=UTU^*.
> $$
>
> Since
>
> $$
> A=A^*,
> $$
>
> we also have
>
> $$
> A^*=A.
> $$
>
> Compute the conjugate transpose of the Schur decomposition:
>
> $$
> A^*=(UTU^*)^*.
> $$
>
> Using
>
> $$
> (ABC)^*=C^*B^*A^*,
> $$
>
> we get
>
> $$
> A^*=(U^*)^*T^*U^*.
> $$
>
> Since
>
> $$
> (U^*)^*=U,
> $$
>
> this gives
>
> $$
> A^*=UT^*U^*.
> $$
>
> But $A=A^*$, so
>
> $$
> UTU^*=UT^*U^*.
> $$
>
> Multiply on the left by $U^*$ and on the right by $U$:
>
> $$
> T=T^*.
> $$
>
> So $T$ is both upper triangular and Hermitian.
>
> Since $T$ is upper triangular,
>
> $$
> T=
> \begin{bmatrix}
> t_{11} & t_{12} & \cdots & t_{1n}\\
> 0 & t_{22} & \cdots & t_{2n}\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & t_{nn}
> \end{bmatrix}.
> $$
>
> Since $T=T^*$, it must also be lower triangular.
>
> Therefore, the only way both can happen is that $T$ is diagonal:
>
> $$
> T=
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}.
> $$
>
> Also, since $T=T^*$, the diagonal entries must be real.
>
> Therefore,
>
> $$
> \lambda_1,\lambda_2,\ldots,\lambda_n\in\mathbb{R}.
> $$
>
> Hence, Hermitian matrices have real eigenvalues.

---

# Normal Matrices

## Definition

> [!note] Definition: Normal Matrix
> A matrix
>
> $$
> A\in\mathbb{C}^{n\times n}
> $$
>
> is called **normal** if
>
> $$
> AA^*=A^*A.
> $$

> [!tip] Real Matrix Case
> If
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> then
>
> $$
> A^*=A^T.
> $$
>
> So a real matrix is normal if
>
> $$
> AA^T=A^TA.
> $$

---

## Normal Matrices Have Orthonormal Eigenvectors

> [!abstract] Lemma
> Normal matrices have a complete set of orthonormal eigenvectors.
>
> Equivalently, if $A$ is normal, then
>
> $$
> A=UDU^*,
> $$
>
> where $U$ is unitary and $D$ is diagonal.

> [!note] Matrix Form
> The decomposition has the form
>
> $$
> A
> =
> U
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}
> U^*.
> $$

> [!success]- Sketch of Proof: Normal Matrix Diagonalizes by Schur
> Start with Schur decomposition:
>
> $$
> A=UTU^*.
> $$
>
> Since $U$ is unitary,
>
> $$
> U^*U=UU^*=I.
> $$
>
> Compute $A^*$:
>
> $$
> A^*=(UTU^*)^*=UT^*U^*.
> $$
>
> Because $A$ is normal,
>
> $$
> AA^*=A^*A.
> $$
>
> Substitute the Schur forms:
>
> $$
> (UTU^*)(UT^*U^*)=(UT^*U^*)(UTU^*).
> $$
>
> Use
>
> $$
> U^*U=I.
> $$
>
> Then
>
> $$
> UTT^*U^*=UT^*TU^*.
> $$
>
> Multiply on the left by $U^*$ and on the right by $U$:
>
> $$
> TT^*=T^*T.
> $$
>
> So $T$ is normal.
>
> But $T$ is also upper triangular.
>
> An upper triangular normal matrix must be diagonal.
>
> Therefore,
>
> $$
> T=
> D
> =
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}.
> $$
>
> Hence,
>
> $$
> A=UDU^*.
> $$
>
> So $A$ has a complete set of orthonormal eigenvectors.

---

## Remark

> [!warning] Remark
> If $A$ is Hermitian, then $A$ is normal.
>
> But the converse is not always true.
>
> That means:
>
> $$
> A=A^*
> \Longrightarrow
> AA^*=A^*A.
> $$
>
> But
>
> $$
> AA^*=A^*A
> $$
>
> does not always imply
>
> $$
> A=A^*.
> $$

---

# Properties of Eigenvalue Factorizations

## Summary Table

> [!note] Notions / Properties of Eigenvalues
> The following concepts are properties related to eigenvalues:
>
> - algebraic multiplicity
> - geometric multiplicity
> - defective matrices
> - semisimple matrices
> - similar matrices
> - diagonalizable matrices
> - Schur decomposition
> - unitary matrices
> - the $*$ operation
> 
> The following matrices for which the Schur decomposition = diagonalization:
> 
> - Hermitian matrices
> - Normal matrices
## Eigendecomposition


> [!abstract] Semisimple
> If $A$ is semisimple, then $A$ is diagonalizable:
>
> $$
> A=VDV^{-1}.
> $$
>
> Here
>
> $$
> V=
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_n\\
> | & | & & |
> \end{bmatrix},
> $$
>
> and
>
> $$
> D=
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}.
> $$

> [!abstract] Normal
> If $A$ is normal, then
>
> $$
> A=UDU^*,
> $$
>
> where $U$ is unitary.
>
> The columns of $U$ are orthonormal eigenvectors.

> [!abstract] Hermitian
> If $A=A^*$, then
>
> $$
> A=U\Lambda U^*,
> $$
>
> where $\Lambda$ is diagonal with real eigenvalues:
>
> $$
> \Lambda=
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix},
> \qquad
> \lambda_i\in\mathbb{R}.
> $$

> [!abstract] Real Symmetric
> If
>
> $$
> A=A^T,
> \qquad A\in\mathbb{R}^{n\times n},
> $$
>
> then
>
> $$
> A=Q\Lambda Q^T,
> $$
>
> where $Q$ is real orthogonal and $\Lambda$ is diagonal with real eigenvalues.

![[eigendecompisition.png]]

---

# Power Method

## Setup

> [!note] Power Method
> The power method is an iterative method for computing the largest eigenvalue
> and its eigenvector.
>
> For simplicity, assume $A$ is semisimple and
>
> $$
> |\lambda_1|>|\lambda_2|\ge \cdots \ge |\lambda_n|.
> $$
>
> Let
>
> $$
> v_1,v_2,\ldots,v_n
> $$
>
> be eigenvectors corresponding to
>
> $$
> \lambda_1,\lambda_2,\ldots,\lambda_n.
> $$

> [!tip] Goal
> We want to compute the top eigenpair:
>
> $$
> (\lambda_1,v_1).
> $$

---

## Idea

> [!note] Main Idea
> Pick a vector $g$ in general position.
>
> This means $g$ has a nonzero component in the direction of $v_1$.
>
> Then repeatedly multiply by $A$:
>
> $$
> g,\ Ag,\ A^2g,\ A^3g,\ldots
> $$
>
> The direction should become closer and closer to the dominant eigenvector
> $v_1$.

---

## Why It Works

> [!success]- Derivation
> Since $v_1,\ldots,v_n$ form a basis, write
>
> $$
> g=c_1v_1+c_2v_2+\cdots+c_nv_n.
> $$
>
> In summation form,
>
> $$
> g=\sum_{i=1}^n c_i v_i.
> $$
>
> Apply $A$:
>
> $$
> Ag
> =
> A\left(\sum_{i=1}^n c_i v_i\right)
> =
> \sum_{i=1}^n c_i Av_i.
> $$
>
> Since
>
> $$
> Av_i=\lambda_i v_i,
> $$
>
> this becomes
>
> $$
> Ag=\sum_{i=1}^n c_i\lambda_i v_i.
> $$
>
> Apply $A$ again:
>
> $$
> A^2g
> =
> A(Ag)
> =
> \sum_{i=1}^n c_i\lambda_i^2v_i.
> $$
>
> In general,
>
> $$
> A^kg
> =
> \sum_{i=1}^n c_i\lambda_i^k v_i.
> $$
>
> Now factor out the dominant eigenvalue term:
>
> $$
> A^kg
> =
> \lambda_1^k
> \left(
> c_1v_1
> +
> \sum_{i=2}^n c_i
> \left(\frac{\lambda_i}{\lambda_1}\right)^k
> v_i
> \right).
> $$
>
> Since
>
> $$
> |\lambda_1|>|\lambda_i|
> \qquad
> \text{for } i=2,\ldots,n,
> $$
>
> we have
>
> $$
> \left|\frac{\lambda_i}{\lambda_1}\right|<1.
> $$
>
> Therefore,
>
> $$
> \left(\frac{\lambda_i}{\lambda_1}\right)^k\to 0
> \qquad
> \text{as } k\to\infty.
> $$
>
> Thus, as $k$ grows,
>
> $$
> A^kg
> \approx
> \lambda_1^k c_1v_1.
> $$
>
> So the direction of $A^kg$ approaches the direction of $v_1$.

---

## Convergence Rate

> [!note] Convergence Rate
> The smaller the ratio
>
> $$
> \left|\frac{\lambda_2}{\lambda_1}\right|,
> $$
>
> the faster the convergence.
>
> If
>
> $$
> \left|\frac{\lambda_2}{\lambda_1}\right|
> $$
>
> is close to $1$, convergence is slow.

---

## Problem: Vectors Grow or Shrink

> [!warning] Numerical Issue
> The vector
>
> $$
> A^kg
> $$
>
> may grow very large or shrink very small.
>
> This is because it contains the factor
>
> $$
> \lambda_1^k.
> $$

> [!tip] Fix
> Normalize after each multiplication.

---

# Normalized Power Method

## Algorithm Idea

> [!note] Normalized Power Method
> Start with an initial vector
>
> $$
> g_{\text{new}}.
> $$
>
> Repeatedly:
>
> 1. multiply by $A$
> 2. normalize the result

> [!note] Normalization
> For a vector
>
> $$
> v=
> \begin{bmatrix}
> v_1\\
> v_2\\
> \vdots\\
> v_n
> \end{bmatrix},
> $$
>
> its Euclidean norm is
>
> $$
> \|v\|_2
> =
> \sqrt{v_1^2+v_2^2+\cdots+v_n^2}.
> $$
>
> Normalization means replacing $v$ by
>
> $$
> \frac{v}{\|v\|_2}.
> $$

---

## Pseudocode / MATLAB Code

> [!example] MATLAB Code
> The notes give the power method in MATLAB style:
>
> ```matlab
> function [vec, lambda] = power_method(A, n_iter)
>     g_new = rand(size(A, 1), 1);
>     g_old = g_new;
>
>     for i = 1:n_iter
>         g_new = A * g_old;
>         lambda = norm(g_new);
>         g_new = g_new / lambda;
>         g_old = g_new;
>     end
>
>     vec = g_old;
> end
> ```

> [!note] Meaning of the Code
> The line
>
> ```matlab
> g_new = A * g_old;
> ```
>
> multiplies the current vector by $A$.
>
> The line
>
> ```matlab
> lambda = norm(g_new);
> ```
>
> estimates the size of the stretching.
>
> The line
>
> ```matlab
> g_new = g_new / lambda;
> ```
>
> normalizes the vector so that it does not blow up or shrink to zero.
>
> Finally,
>
> ```matlab
> vec = g_old;
> ```
>
> returns the approximate dominant eigenvector.

