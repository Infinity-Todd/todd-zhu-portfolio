# Lecture 24 - Eigenvalues Review; Iterative Methods for Linear Systems

> [!info] Lecture Overview
> Topics:
>
> - Eigenvalues review
> - Defective, semisimple, normal, Hermitian, symmetric matrices
> - True/False review examples
> - Power method example
> - Why iterative methods are needed
> - Direct methods for solving $Ax=b$
> - Complexity issue with direct methods
> - Motivation for iterative methods

---

# Eigenvalues Review

## Example Matrix

> [!example] Example
> Consider
>
> $$
> A=
> \begin{bmatrix}
> 3 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 2 & 1
> \end{bmatrix}.
> $$
>
> Questions:
>
> - Is $A$ defective or semisimple?
> - What are the eigenvalues?
> - Is $A$ symmetric?
> - Is $A$ normal?
> - Is $A$ Hermitian?

> [!success]- Solution
> Since $A$ is lower triangular, the eigenvalues are the diagonal entries:
>
> $$
> \lambda_1=3,
> \qquad
> \lambda_2=1,
> \qquad
> \lambda_3=1.
> $$
>
> So $\lambda=3$ has algebraic multiplicity $1$, and $\lambda=1$ has
> algebraic multiplicity $2$.
>
> Now check the geometric multiplicity for $\lambda=1$.
>
> We compute
>
> $$
> \lambda I-A=I-A.
> $$
>
> Since
>
> $$
> I=
> \begin{bmatrix}
> 1 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 0 & 1
> \end{bmatrix},
> $$
>
> we get
>
> $$
> I-A
> =
> \begin{bmatrix}
> 1 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 3 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 2 & 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> -2 & 0 & 0\\
> 0 & 0 & 0\\
> 0 & -2 & 0
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> (I-A)v=0.
> $$
>
> That is,
>
> $$
> \begin{bmatrix}
> -2 & 0 & 0\\
> 0 & 0 & 0\\
> 0 & -2 & 0
> \end{bmatrix}
> \begin{bmatrix}
> v_1\\
> v_2\\
> v_3
> \end{bmatrix}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> From the first row,
>
> $$
> -2v_1=0,
> $$
>
> so
>
> $$
> v_1=0.
> $$
>
> From the third row,
>
> $$
> -2v_2=0,
> $$
>
> so
>
> $$
> v_2=0.
> $$
>
> The variable $v_3$ is free.
>
> Therefore,
>
> $$
> \operatorname{Null}(I-A)
> =
> \operatorname{span}
> \left\{
> \begin{bmatrix}
> 0\\
> 0\\
> 1
> \end{bmatrix}
> \right\}.
> $$
>
> So the geometric multiplicity of $\lambda=1$ is
>
> $$
> 1.
> $$
>
> But the algebraic multiplicity of $\lambda=1$ is
>
> $$
> 2.
> $$
>
> Since
>
> $$
> \text{geometric multiplicity}<\text{algebraic multiplicity},
> $$
>
> the matrix $A$ is defective.
>
> Therefore, $A$ is not semisimple.
>
> Also,
>
> $$
> A^T=
> \begin{bmatrix}
> 3 & 0 & 0\\
> 0 & 1 & 2\\
> 0 & 0 & 1
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> A^T\ne A,
> $$
>
> $A$ is not symmetric.
>
> Since $A$ is real, Hermitian means symmetric. Therefore, $A$ is not
> Hermitian and not normal.
>
> Final answers:
>
> - $A$ is defective.
> - $A$ is not semisimple.
> - $A$ is not normal.
> - $A$ is not Hermitian.
> - $A$ is not symmetric.

---

# Quick True / False Review

## Statement 1

> [!question] True or False?
> A real matrix
>
> $$
> A
> $$
>
> of size
>
> $$
> 5\times 5
> $$
>
> can have exactly two real eigenvalues, counting multiplicity.

> [!success]- Answer
> False.
>
> A real matrix can have complex eigenvalues, but non-real complex eigenvalues
> must come in conjugate pairs.
>
> Since
>
> $$
> 5
> $$
>
> is odd, a real $5\times 5$ matrix must have an odd number of real eigenvalues,
> counting multiplicity.
>
> So it cannot have exactly two real eigenvalues.

---

## Statement 2

> [!question] True or False?
> A complex matrix
>
> $$
> A
> $$
>
> of size
>
> $$
> 6\times 6
> $$
>
> can have only real eigenvalues.

> [!success]- Answer
> True.
>
> A complex matrix is allowed to have complex entries, but its eigenvalues do
> not have to be non-real.
>
> For example,
>
> $$
> I_6=
> \begin{bmatrix}
> 1 & 0 & 0 & 0 & 0 & 0\\
> 0 & 1 & 0 & 0 & 0 & 0\\
> 0 & 0 & 1 & 0 & 0 & 0\\
> 0 & 0 & 0 & 1 & 0 & 0\\
> 0 & 0 & 0 & 0 & 1 & 0\\
> 0 & 0 & 0 & 0 & 0 & 1
> \end{bmatrix}
> $$
>
> is a complex matrix if we view it as a matrix over $\mathbb{C}$, and all of
> its eigenvalues are real.

---

## Statement 3

> [!question] True or False?
> A matrix of size
>
> $$
> 7\times 7
> $$
>
> with eigenvalues
>
> $$
> 3,\ 3,\ -2,\ 1,\ 1,\ \frac12,\ -\frac12
> $$
>
> and with geometric multiplicities
>
> $$
> 2,\ 1,\ 1,\ 1,\ 1
> $$
>
> is semisimple.

> [!success]- Answer
> False.
>
> The eigenvalue list is:
>
> $$
> 3,\ 3,\ -2,\ 1,\ 1,\ \frac12,\ -\frac12.
> $$
>
> So the distinct eigenvalues are
>
> $$
> 3,\ -2,\ 1,\ \frac12,\ -\frac12.
> $$
>
> Their algebraic multiplicities are:
>
> $$
> \lambda=3
> \quad\Rightarrow\quad
> \text{algebraic multiplicity }2,
> $$
>
> $$
> \lambda=-2
> \quad\Rightarrow\quad
> \text{algebraic multiplicity }1,
> $$
>
> $$
> \lambda=1
> \quad\Rightarrow\quad
> \text{algebraic multiplicity }2,
> $$
>
> $$
> \lambda=\frac12
> \quad\Rightarrow\quad
> \text{algebraic multiplicity }1,
> $$
>
> $$
> \lambda=-\frac12
> \quad\Rightarrow\quad
> \text{algebraic multiplicity }1.
> $$
>
> The given geometric multiplicities are:
>
> $$
> 2,\ 1,\ 1,\ 1,\ 1.
> $$
>
> The issue is that for the repeated eigenvalue
>
> $$
> \lambda=1,
> $$
>
> the algebraic multiplicity is
>
> $$
> 2,
> $$
>
> but the geometric multiplicity is
>
> $$
> 1.
> $$
>
> Since the geometric multiplicity is less than the algebraic multiplicity,
> the matrix is defective.
>
> Therefore, it is not semisimple.

---

## Statement 4

> [!question] True or False?
> There exist normal real matrices with complex eigenvalues.

> [!success]- Answer
> True.
>
> For real matrices, normal means
>
> $$
> AA^T=A^TA.
> $$
>
> Orthogonal matrices are normal, but they do not always have real eigenvalues.
>
> For example, the rotation matrix
>
> $$
> Q=
> \begin{bmatrix}
> 0 & -1\\
> 1 & 0
> \end{bmatrix}
> $$
>
> is real and orthogonal.
>
> Since
>
> $$
> Q^TQ=QQ^T=I,
> $$
>
> it is normal.
>
> But its eigenvalues are
>
> $$
> \lambda=\pm i.
> $$
>
> So a real normal matrix can have complex eigenvalues.

---

# Power Method Example

> [!example] Example
> Use 4 steps of the power method for
>
> $$
> A=
> \begin{bmatrix}
> 7 & 5\\
> -1 & 1
> \end{bmatrix},
> \qquad
> q=
> \begin{bmatrix}
> -1\\
> 0
> \end{bmatrix}.
> $$
>
> The actual answer is
>
> $$
> \left(
> 6,
> \begin{bmatrix}
> -1\\
> \frac15
> \end{bmatrix}
> \right).
> $$

> [!success]- Solution
> Start with
>
> $$
> q_0=q=
> \begin{bmatrix}
> -1\\
> 0
> \end{bmatrix}.
> $$
>
> The notes use normalization by dividing by the largest-magnitude entry.
>
> Since the largest-magnitude entry of $q_0$ is
>
> $$
> -1,
> $$
>
> we may normalize first:
>
> $$
> q_0=\frac{q}{-1}
> =
> \begin{bmatrix}
> 1\\
> 0
> \end{bmatrix}.
> $$
>
> Now compute
>
> $$
> q_1=Aq_0.
> $$
>
> $$
> q_1
> =
> \begin{bmatrix}
> 7 & 5\\
> -1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> 0
> \end{bmatrix}
> =
> \begin{bmatrix}
> 7\\
> -1
> \end{bmatrix}.
> $$
>
> Normalize by
>
> $$
> s_1=7.
> $$
>
> Therefore,
>
> $$
> q_1
> =
> \frac{1}{7}
> \begin{bmatrix}
> 7\\
> -1
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> -\frac17
> \end{bmatrix}.
> $$
>
> Next compute
>
> $$
> q_2=Aq_1.
> $$
>
> $$
> q_2
> =
> \begin{bmatrix}
> 7 & 5\\
> -1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> -\frac17
> \end{bmatrix}
> =
> \begin{bmatrix}
> 7-\frac57\\
> -1-\frac17
> \end{bmatrix}
> =
> \begin{bmatrix}
> \frac{44}{7}\\
> -\frac87
> \end{bmatrix}.
> $$
>
> Normalize by
>
> $$
> s_2=\frac{44}{7}.
> $$
>
> Then
>
> $$
> q_2
> =
> \frac{1}{44/7}
> \begin{bmatrix}
> \frac{44}{7}\\
> -\frac87
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> -\frac{2}{11}
> \end{bmatrix}.
> $$
>
> Next compute
>
> $$
> q_3=Aq_2.
> $$
>
> $$
> q_3
> =
> \begin{bmatrix}
> 7 & 5\\
> -1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> -\frac{2}{11}
> \end{bmatrix}
> =
> \begin{bmatrix}
> 7-\frac{10}{11}\\
> -1-\frac{2}{11}
> \end{bmatrix}
> =
> \begin{bmatrix}
> \frac{67}{11}\\
> -\frac{13}{11}
> \end{bmatrix}.
> $$
>
> Normalize by
>
> $$
> s_3=\frac{67}{11}.
> $$
>
> Then
>
> $$
> q_3
> =
> \frac{1}{67/11}
> \begin{bmatrix}
> \frac{67}{11}\\
> -\frac{13}{11}
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> -\frac{13}{67}
> \end{bmatrix}.
> $$
>
> Next compute
>
> $$
> q_4=Aq_3.
> $$
>
> $$
> q_4
> =
> \begin{bmatrix}
> 7 & 5\\
> -1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> -\frac{13}{67}
> \end{bmatrix}
> =
> \begin{bmatrix}
> 7-\frac{65}{67}\\
> -1-\frac{13}{67}
> \end{bmatrix}
> =
> \begin{bmatrix}
> \frac{404}{67}\\
> -\frac{80}{67}
> \end{bmatrix}.
> $$
>
> Normalize by
>
> $$
> s_4=\frac{404}{67}.
> $$
>
> Therefore,
>
> $$
> q_4
> =
> \frac{1}{404/67}
> \begin{bmatrix}
> \frac{404}{67}\\
> -\frac{80}{67}
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> -\frac{20}{101}
> \end{bmatrix}.
> $$
>
> Since eigenvectors can be multiplied by any nonzero scalar,
>
> $$
> \begin{bmatrix}
> 1\\
> -\frac15
> \end{bmatrix}
> $$
>
> is equivalent to
>
> $$
> \begin{bmatrix}
> -1\\
> \frac15
> \end{bmatrix}.
> $$
>
> The power method is approaching
>
> $$
> \begin{bmatrix}
> 1\\
> -\frac15
> \end{bmatrix},
> $$
>
> which represents the same eigenvector direction as
>
> $$
> \begin{bmatrix}
> -1\\
> \frac15
> \end{bmatrix}.
> $$
>
> The scaling values approach
>
> $$
> 6.
> $$
>
> So the dominant eigenpair is approximately
>
> $$
> \left(
> 6,
> \begin{bmatrix}
> -1\\
> \frac15
> \end{bmatrix}
> \right).
> $$

---

# Iterative Methods

## Broad View

> [!note] Broad View
> In numerical linear algebra, there are two main types of problems:
>
> 1. Solve or approximate solutions to
>
> $$
> Ax=b.
> $$
>
> 2. Solve or approximate eigenvalues, singular values, and vectors:
>
> $$
> Ax=\lambda x.
> $$

---

## Direct Methods vs Iterative Methods

> [!note] Direct Methods
> The first problem,
>
> $$
> Ax=b,
> $$
>
> can often be solved by direct methods, such as:
>
> - LU
> - PLU
> - Cholesky
> - backward substitution
> - forward substitution
> - QR
> - SVD

> [!warning] Eigenvalue Problems Need Iterative Methods
> The second problem,
>
> $$
> Ax=\lambda x,
> $$
>
> generally cannot be solved directly.
>
> It usually requires iterative methods such as:
>
> - power method
> - reduction to Hessenberg form followed by QR iteration

---

## Why Care About Iterative Methods for $Ax=b$?

> [!question] Question
> Since we can solve
>
> $$
> Ax=b
> $$
>
> using direct methods, why should we care about iterative methods?

> [!note] Direct Method Complexity
> Direct methods such as LU, PLU, and Cholesky usually cost about
>
> $$
> O(n^3)
> $$
>
> flops for an
>
> $$
> n\times n
> $$
>
> matrix.

---

# Why $O(n^3)$ Can Be Too Large

## Large Linear Systems

> [!note] Problem
> Some discretizations construct linear systems where exact arithmetic accuracy
> is proportional to
>
> $$
> \frac1n,
> $$
>
> where
>
> $$
> n=\text{number of discretization points}.
> $$

> [!example] Satellite Trajectory Example
> Suppose we want to compute the trajectory of a satellite sent to orbit Mars
> and land a rover.
>
> We want accuracy over hundreds of millions of kilometers.
>
> That can require billions of discretization points.

---

## Cost Example

> [!example] Cost Calculation
> Suppose
>
> $$
> n=10^6.
> $$
>
> Then
>
> $$
> n^3=10^{18}.
> $$
>
> Suppose the computer runs at
>
> $$
> 3\text{ GHz}=3\times 10^9
> $$
>
> flops per second.
>
> Then the time required is approximately
>
> $$
> \frac{10^{18}}{3\times 10^9}
> =
> \frac13\times 10^9
> \text{ seconds}.
> $$
>
> Convert seconds to years:
>
> $$
> \frac{\frac13\times 10^9}{3600\cdot 24\cdot 365}
> \approx
> 10.6
> \text{ years}.
> $$
>
> Using the more precise leading constant from direct methods gives a value on
> the order of several years.
>
> The point is that direct methods become too slow for very large systems.

> [!warning] Conclusion
> For very large systems, we need faster methods to solve linear systems.
>
> Enter: iterative methods.
