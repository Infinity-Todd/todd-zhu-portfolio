# Lecture 20 - Eigenvalue Properties; the Schur Decomposition

> [!info] Lecture Overview
> Topics:
>
> - Real vs. complex eigenvalues
> - Complex roots and multiplicity
> - Companion matrix
> - Algebraic multiplicity
> - Geometric multiplicity
> - Defective matrices
> - Similarity transformations
> - Semisimple matrices
> - Schur decomposition
> - Real Schur form

---

# Eigenvalues in $\mathbb{C}$ and $\mathbb{R}$

## Polynomial Roots

> [!note] Polynomial Roots Over $\mathbb{C}$
> Although we usually cannot compute eigenvalues exactly by solving high-degree
> polynomials, eigenvalues are still roots of polynomials.
>
> A polynomial equation
>
> $$
> p(z)=0
> $$
>
> where
>
> $$
> p(z)=z^n+a_{n-1}z^{n-1}+\cdots+a_1z+a_0
> $$
>
> always has exactly $n$ roots over $\mathbb{C}$, counting multiplicity.

> [!warning] Not Always Over $\mathbb{R}$
> This is not always true over $\mathbb{R}$.
>
> For example,
>
> $$
> p(z)=z^2+1.
> $$
>
> Solving
>
> $$
> z^2+1=0
> $$
>
> gives
>
> $$
> z=\pm i.
> $$
>
> So this polynomial has no real roots, but it has two complex roots with multiplicities 1 each.

---

## Matrix Example with Complex Eigenvalues

> [!example] Example
> Consider
>
> $$
> A=
> \begin{bmatrix}
> 0 & 1\\
> -1 & 0
> \end{bmatrix}.
> $$
>
> This is a real matrix, but it has complex eigenvalues.

> [!success]- Computation
> The characteristic polynomial is
>
> $$
> p_A(z)=\det(zI-A).
> $$
>
> First,
>
> $$
> zI=
> \begin{bmatrix}
> z & 0\\
> 0 & z
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> zI-A
> =
> \begin{bmatrix}
> z & 0\\
> 0 & z
> \end{bmatrix}
> -
> \begin{bmatrix}
> 0 & 1\\
> -1 & 0
> \end{bmatrix}
> =
> \begin{bmatrix}
> z & -1\\
> 1 & z
> \end{bmatrix}.
> $$
>
> Thus
>
> $$
> p_A(z)
> =
> \det
> \begin{bmatrix}
> z & -1\\
> 1 & z
> \end{bmatrix}.
> $$
>
> Using
>
> $$
> \det
> \begin{bmatrix}
> a & b\\
> c & d
> \end{bmatrix}
> =
> ad-bc,
> $$
>
> we get
>
> $$
> p_A(z)
> =
> z\cdot z-(-1)(1)
> =
> z^2+1.
> $$
>
> So
>
> $$
> z^2+1=0.
> $$
>
> Therefore,
>
> $$
> z=\pm i.
> $$
>
> So this real matrix has no real eigenvalues, but it has two complex
> eigenvalues.

> [!note] Important Fact
> A complex matrix always has $n$ complex eigenvalues, counting multiplicity.
>
> A real matrix may not have $n$ real eigenvalues.
>
> However, any real matrix that has a complex eigenvalue
>
> $$
> \lambda=a+ib
> $$
>
> also has the conjugate eigenvalue
>
> $$
> \overline{\lambda}=a-ib,
> $$
>
> with the same multiplicity.

> [!tip] Real Matrix Fact
> A real matrix of odd size
>
> $$
> A\in\mathbb{R}^{n\times n},
> \qquad n \text{ odd},
> $$
>
> is guaranteed to have an odd number of real eigenvalues.
>
> This is because nonreal complex eigenvalues come in conjugate pairs.

---

# Companion Matrix

## Why Companion Matrices Matter

> [!note] Important Point
> Computing roots of polynomials and computing eigenvalues of matrices are
> equivalent problems.
>
> If we could compute roots of polynomials, then we could compute eigenvalues.
>
> Conversely, if we could compute eigenvalues, then we could compute roots of
> polynomials.

---

## Companion Matrix Definition

> [!note] Definition: Companion Matrix
> Let
>
> $$
> p(z)=z^n+a_{n-1}z^{n-1}+\cdots+a_1z+a_0.
> $$
>
> The companion matrix of $p$ is
>
> $$
> A_p=
> \begin{bmatrix}
> -a_{n-1} & -a_{n-2} & \cdots & -a_1 & -a_0\\
> 1 & 0 & \cdots & 0 & 0\\
> 0 & 1 & \cdots & 0 & 0\\
> \vdots & \vdots & \ddots & \vdots & \vdots\\
> 0 & 0 & \cdots & 1 & 0
> \end{bmatrix}.
> $$

> [!abstract] Key Property
> The companion matrix satisfies
>
> $$
> \det(zI-A_p)=p(z).
> $$
>
> Therefore, the roots of $p$ are exactly the eigenvalues of $A_p$.

> [!tip] Meaning
> Finding roots of a polynomial can be converted into finding eigenvalues of a
> matrix.
>
> This is why eigenvalue computation is a fundamental numerical problem.

---

# Multiplicity of Eigenvalues

## Algebraic Multiplicity

> [!note] Algebraic Multiplicity
> An eigenvalue $\lambda$ of
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> has **algebraic multiplicity** equal to its multiplicity as a root of the
> characteristic polynomial
>
> $$
> p_A(\lambda)=\det(\lambda I-A).
> $$

> [!example] Example
> If
>
> $$
> p_A(\lambda)=(\lambda-2)^2(\lambda+3),
> $$
>
> then
>
> $$
> \lambda_1=2
> $$
>
> has algebraic multiplicity $2$, and
>
> $$
> \lambda_2=-3
> $$
>
> has algebraic multiplicity $1$.

---

## Geometric Multiplicity

> [!note] Geometric Multiplicity
> The **geometric multiplicity** of an eigenvalue $\lambda$ is
>
> $$
> \dim\left(\operatorname{Null}(\lambda I-A)\right).
> $$
>
> This equals the largest number of linearly independent eigenvectors
> associated with $\lambda$.

> [!note] Eigenspace
> The eigenspace for $\lambda$ is
>
> $$
> \operatorname{Null}(\lambda I-A)
> =
> \{v:(\lambda I-A)v=0\}.
> $$
>
> Since
>
> $$
> Av=\lambda v
> $$
>
> is equivalent to
>
> $$
> (\lambda I-A)v=0,
> $$
>
> the eigenspace is exactly the nullspace of $\lambda I-A$.

---

## Relationship Between Multiplicities

> [!abstract] Important Inequality
> It is always true that
>
> $$
> \text{algebraic multiplicity}
> \ge
> \text{geometric multiplicity}.
> $$

> [!tip] Meaning
> Algebraic multiplicity counts how many times $\lambda$ appears as a root of
> the characteristic polynomial.
>
> Geometric multiplicity counts how many independent eigenvectors correspond to
> $\lambda$.

---

# Examples of Multiplicity

## Example 1: Defective Matrix

> [!example] Example
> Consider
>
> $$
> A=
> \begin{bmatrix}
> 2 & 1\\
> -1 & 0
> \end{bmatrix}.
> $$
>
> We find its eigenvalues and eigenvectors.

> [!success]- Solution
> Compute
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
> 2 & 1\\
> -1 & 0
> \end{bmatrix}
> =
> \begin{bmatrix}
> \lambda-2 & -1\\
> 1 & \lambda
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
> \lambda-2 & -1\\
> 1 & \lambda
> \end{bmatrix}.
> $$
>
> Compute the determinant:
>
> $$
> p_A(\lambda)
> =
> (\lambda-2)\lambda-(-1)(1)
> =
> \lambda^2-2\lambda+1.
> $$
>
> Factor:
>
> $$
> p_A(\lambda)
> =
> (\lambda-1)^2.
> $$
>
> So the only eigenvalue is
>
> $$
> \lambda=1,
> $$
>
> with algebraic multiplicity $2$.
>
> Now find the eigenspace:
>
> $$
> \operatorname{Null}(\lambda I-A)
> =
> \operatorname{Null}(I-A).
> $$
>
> Compute
>
> $$
> I-A
> =
> \begin{bmatrix}
> 1 & 0\\
> 0 & 1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 2 & 1\\
> -1 & 0
> \end{bmatrix}
> =
> \begin{bmatrix}
> -1 & -1\\
> 1 & 1
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> \begin{bmatrix}
> -1 & -1\\
> 1 & 1
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
> Hence
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
> Therefore,
>
> $$
> \operatorname{Null}(I-A)
> =
> \operatorname{span}
> \left\{
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}
> \right\}.
> $$
>
> So the geometric multiplicity is
>
> $$
> 1.
> $$
>
> Therefore,
>
> $$
> \text{algebraic multiplicity}=2,
> \qquad
> \text{geometric multiplicity}=1.
> $$

> [!warning] Conclusion
> This matrix is **defective** because it has fewer than $n$ linearly
> independent eigenvectors.

---

## Example 2: Semisimple Matrix

> [!example] Example
> Consider
>
> $$
> A=
> \begin{bmatrix}
> 1 & 0\\
> 0 & 1
> \end{bmatrix}.
> $$
>
>We find its eigenvalues and eigenvectors.

> [!success]- Solution
> Compute the root of polynomial 
>
> $$
> p_A(\lambda)=\det\begin{bmatrix}1-\lambda &0\\0&1-\lambda\end{bmatrix}=(\lambda-1)^2.
> $$
>
> So
>
> $$
> \lambda=1
> $$
>
> has algebraic multiplicity $2$.
>
Compute
>
> $$
> \lambda I-A=I-I=
> \begin{bmatrix}
> 0 & 0\\
> 0 & 0
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \operatorname{Null}(I-A)=\mathbb{R}^2.
> $$
>
> So every nonzero vector
>
> $$
> x=
> \begin{bmatrix}
> x_1\\
> x_2
> \end{bmatrix}
> \in\mathbb{R}^2
> $$
>
> is an eigenvector for $\lambda=1$.
>
> For example,
>
> $$
> \begin{bmatrix}
> 1\\
> 0
> \end{bmatrix},
> \qquad
> \begin{bmatrix}
> 0\\
> 1
> \end{bmatrix}
> $$
>
> are two linearly independent eigenvectors.
>
> Therefore,
>
> $$
> \text{algebraic multiplicity}=2,
> \qquad
> \text{geometric multiplicity}=2.
> $$

> [!tip] Conclusion
> This matrix is **semisimple** because it has enough linearly independent
> eigenvectors.

---

# Defective and Semisimple Matrices

## Defective Matrix

> [!note] Defective Matrix
> An
>
> $$
> n\times n
> $$
>
> matrix with fewer than $n$ linearly independent eigenvectors is called
> **defective**.

> [!example] Example
> From above,
>
> $$
> A=
> \begin{bmatrix}
> 2 & 1\\
> -1 & 0
> \end{bmatrix}
> $$
>
> is defective.

---

## Semisimple Matrix

> [!note] Semisimple Matrix
> If
>
> $$
> A
> $$
>
> has $n$ linearly independent eigenvectors, then $A$ is not defective.
>
> In this class, we call this **semisimple**.

> [!example] Example
> From above,
>
> $$
> A=
> \begin{bmatrix}
> 1 & 0\\
> 0 & 1
> \end{bmatrix}
> $$
>
> is semisimple.

---

## Distinct Eigenvalues

>[!note] Useful fact
>If ${\lambda_{1},\lambda_{2},\dots,\lambda_{k}}$ are distinct eigenvalue of $A$ with corresponding eigenvalues ${v_{1},v_{2},\dots,v_{k}}$, then
>$$
>\{v_{1},v_{2},\dots,v_{k}\}
>$$
>is a linearly independent set.
>


> [!abstract] Corollary
> If
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> has $n$ distinct eigenvalues, then $A$ is semisimple.

> [!warning] Careful
> This is a sufficient condition, not a necessary condition.
>
> That means:
>
> $$
> n \text{ distinct eigenvalues}
> \Longrightarrow
> \text{semisimple}.
> $$
>
> But a matrix can still be semisimple even if it has repeated eigenvalues.

---

# Similarity Transformations

## Definition

> [!note] Definition: Similar Matrices
> Let
>
> $$
> A,B\in\mathbb{C}^{n\times n}
> $$
>
> and let
>
> $$
> S\in\mathbb{C}^{n\times n}
> $$
>
> be invertible.
>
> If
>
> $$
> B=S^{-1}AS,
> $$
>
> then $A$ and $B$ are called **similar**.

> [!tip] Deeper Meaning
> Similar matrices describe the same linear transformation, but written in
> different bases.
>
> The matrix $S$ is the change-of-basis matrix.

---

## Eigenvalues Under Similarity

> [!abstract] Lemma
> If
>
> $$
> B=S^{-1}AS,
> $$
>
> and
>
> $$
> Av=\lambda v,
> $$
>
> then
>
> $$
> B(S^{-1}v)=\lambda(S^{-1}v).
> $$
>
> Therefore, similar matrices have the same eigenvalues.

> [!success]- Proof
> Suppose
>
> $$
> Av=\lambda v.
> $$
>
> Since
>
> $$
> B=S^{-1}AS,
> $$
>
> compute
>
> $$
> B(S^{-1}v)
> =
> S^{-1}AS(S^{-1}v).
> $$
>
> Since
>
> $$
> S(S^{-1}v)=v,
> $$
>
> this becomes
>
> $$
> B(S^{-1}v)
> =
> S^{-1}Av.
> $$
>
> Since
>
> $$
> Av=\lambda v,
> $$
>
> we get
>
> $$
> B(S^{-1}v)
> =
> S^{-1}(\lambda v).
> $$
>
> Since $\lambda$ is a scalar,
>
> $$
> S^{-1}(\lambda v)=\lambda S^{-1}v.
> $$
>
> Therefore,
>
> $$
> B(S^{-1}v)=\lambda(S^{-1}v).
> $$
>
> So if $(\lambda,v)$ is an eigenpair for $A$, then
>
> $$
> (\lambda,S^{-1}v)
> $$
>
> is an eigenpair for $B$.

> [!abstract] Corollary
> Similar matrices have:
>
> - the same eigenvalues
> - the same algebraic multiplicities
> - the same geometric multiplicities

---

# Diagonalization

## Semisimple Matrices Are Diagonalizable

> [!abstract] Lemma
> Suppose
>
> $$
> A\in\mathbb{C}^{n\times n}
> $$
>
> is semisimple with eigenpairs
>
> $$
> (\lambda_1,v_1),(\lambda_2,v_2),\ldots,(\lambda_n,v_n),
> $$
>
> where
>
> $$
> \{v_1,v_2,\ldots,v_n\}
> $$
>
> is linearly independent.
>
> Let
>
> $$
> V=
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_n\\
> | & | & & |
> \end{bmatrix}
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
>
> Then
>
> $$
> A=VDV^{-1}.
> $$

> [!success]- Proof
> For every eigenpair
>
> $$
> (\lambda_i,v_i),
> $$
>
> we have
>
> $$
> Av_i=\lambda_i v_i.
> $$
>
> Place the eigenvectors into the matrix
>
> $$
> V=
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_n\\
> | & | & & |
> \end{bmatrix}.
> $$
>
> Then
>
> $$
> AV
> =
> A
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_n\\
> | & | & & |
> \end{bmatrix}
> =
> \begin{bmatrix}
> | & | & & |\\
> Av_1 & Av_2 & \cdots & Av_n\\
> | & | & & |
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> Av_i=\lambda_i v_i,
> $$
>
> we get
>
> $$
> AV
> =
> \begin{bmatrix}
> | & | & & |\\
> \lambda_1v_1 & \lambda_2v_2 & \cdots & \lambda_nv_n\\
> | & | & & |
> \end{bmatrix}.
> $$
>
> This is the same as
>
> $$
> VD
> =
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_n\\
> | & | & & |
> \end{bmatrix}
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> AV=VD.
> $$
>
> Since the eigenvectors are linearly independent, $V$ is invertible.
>
> Multiply on the right by $V^{-1}$:
>
> $$
> A=VDV^{-1}.
> $$

> [!abstract] Corollary
> Semisimple matrices are diagonalizable.
>
> Equivalently, every semisimple matrix is similar to its diagonal matrix of
> eigenvalues:
>
> $$
> V^{-1}AV=D.
> $$


---
# What About Defective Matrices?

## Recall: Complex Conjugate

> [!note] Complex Conjugate
> For a complex number
>
> $$
> a+ib,
> $$
>
> its complex conjugate is
>
> $$
> \overline{a+ib}=a-ib,
> $$
>
> where
>
> $$
> a,b\in\mathbb{R},
> \qquad
> i=\sqrt{-1}.
> $$

---

## Complex Conjugate Transpose

> [!note] Complex Conjugate Transpose
> For matrices, the complex conjugate transpose is written as
>
> $$
> A^*.
> $$
>
> It is defined by
>
> $$
> A^*=(\overline{A})^T.
> $$
>
> Equivalently,
>
> $$
> A^*=\overline{A^T}.
> $$

> [!note] Explicit Matrix Example
> If
>
> $$
> A=
> \begin{bmatrix}
> 1+i & 2-3i\\
> 4+i & 5
> \end{bmatrix},
> $$
>
> then first conjugate every entry:
>
> $$
> \overline{A}
> =
> \begin{bmatrix}
> 1-i & 2+3i\\
> 4-i & 5
> \end{bmatrix}.
> $$
>
> Then transpose:
>
> $$
> A^*
> =
> (\overline{A})^T
> =
> \begin{bmatrix}
> 1-i & 4-i\\
> 2+3i & 5
> \end{bmatrix}.
> $$

> [!tip] Real Matrix Case
> If
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> then all entries are real, so conjugation changes nothing.
>
> Therefore,
>
> $$
> A^*=A^T.
> $$

---

## Unitary Matrices

> [!note] Unitary Matrix
> A unitary matrix is the complex version of an orthogonal matrix.
>
> A matrix
>
> $$
> U\in\mathbb{C}^{n\times n}
> $$
>
> is unitary if
>
> $$
> U^*U=UU^*=I.
> $$

> [!tip] Comparison With Orthogonal Matrices
> For real matrices, orthogonal means
>
> $$
> Q^TQ=QQ^T=I.
> $$
>
> For complex matrices, unitary means
>
> $$
> U^*U=UU^*=I.
> $$
>
> So $U^*$ plays the role of $Q^T$.

---

# Schur Decomposition

## Schur Decomposition

> [!abstract] Theorem: Schur Decomposition
> Any matrix
>
> $$
> A\in\mathbb{C}^{n\times n}
> $$
>
> has a factorization
>
> $$
> A=UTU^*,
> $$
>
> where
>
> $$
> U\in\mathbb{C}^{n\times n}
> $$
>
> is unitary, and
>
> $$
> T\in\mathbb{C}^{n\times n}
> $$
>
> is complex upper triangular.

> [!note] Matrix Form
> The matrix $T$ has the form
>
> $$
> T=
> \begin{bmatrix}
> \lambda_1 & * & * & \cdots & *\\
> 0 & \lambda_2 & * & \cdots & *\\
> 0 & 0 & \lambda_3 & \cdots & *\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & \lambda_n
> \end{bmatrix}.
> $$
>
> Therefore,
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

> [!tip] Meaning
> The eigenvalues of $A$ appear on the diagonal of $T$:
>
> $$
> \lambda_1,\lambda_2,\ldots,\lambda_n.
> $$
>
> This works even if $A$ is defective.
>
> So even when $A$ cannot be diagonalized, it can still be triangularized by a
> unitary change of basis.

---

## Real Schur Form

> [!abstract] Real Schur Remark
> If
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> then we can write
>
> $$
> A=QTQ^T,
> $$
>
> where
>
> $$
> Q\in\mathbb{R}^{n\times n}
> $$
>
> is orthogonal.
>
> But $T$ is not always upper triangular with only real eigenvalues on the
> diagonal.

> [!note] Block Upper Triangular Form
> Instead, $T$ is block upper triangular with $1\times 1$ and $2\times 2$
> blocks on the diagonal:
>
> $$
> T=
> \begin{bmatrix}
> a & * & * & * & * & *\\
> 0 & b & * & * & * & *\\
> 0 & 0 & c & d & * & *\\
> 0 & 0 & -d & c & * & *\\
> 0 & 0 & 0 & 0 & e & f\\
> 0 & 0 & 0 & 0 & -f & e
> \end{bmatrix}.
> $$

> [!tip] Meaning of the Blocks
> The $1\times 1$ blocks correspond to real eigenvalues.
>
> For example,
>
> $$
> [a],
> \qquad
> [b].
> $$
>
> The $2\times 2$ blocks correspond to complex conjugate eigenvalue pairs.
>
> For example,
>
> $$
> \begin{bmatrix}
> c & d\\
> -d & c
> \end{bmatrix}
> $$
>
> corresponds to the complex eigenvalues
>
> $$
> c+di,
> \qquad
> c-di.
> $$
---
