# Lecture 23 - Return to the SVD

> [!info] Lecture Overview
> Topics:
>
> - One more power method example
> - Return to the SVD
> - Relationship between eigenvalues and singular values
> - Special relationship for normal matrices
> - Computing SVD using $A^TA$
> - Why computing SVD from $A^TA$ can be inaccurate
> - Computing SVD using a block matrix
> - Relationship between singular values and eigenvalues of the block matrix
> - Shifted block matrix method

---

# One More Power Method Example

> [!example] Power Method Example
> Recall the power method.
>
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & 0 & 1\\
> -1 & 5 & 0\\
> 0 & 0 & 1
> \end{bmatrix},
> \qquad
> q_0=
> \begin{bmatrix}
> 1\\
> -1\\
> 1
> \end{bmatrix}.
> $$
>
> We want to approximate the dominant eigenvalue and dominant eigenvector.

> [!success]- Solution
> First compute the eigenvalues.
>
> $$
> \lambda I-A
> =
> \begin{bmatrix}
> \lambda & 0 & 0\\
> 0 & \lambda & 0\\
> 0 & 0 & \lambda
> \end{bmatrix}
> -
> \begin{bmatrix}
> 1 & 0 & 1\\
> -1 & 5 & 0\\
> 0 & 0 & 1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \lambda I-A
> =
> \begin{bmatrix}
> \lambda-1 & 0 & -1\\
> 1 & \lambda-5 & 0\\
> 0 & 0 & \lambda-1
> \end{bmatrix}.
> $$
>
> This matrix is upper triangular except for the entry in the top-right corner.
> That top-right entry does not affect the determinant expansion, so
>
> $$
> \det(\lambda I-A)
> =
> (\lambda-1)(\lambda-5)(\lambda-1).
> $$
>
> Hence,
>
> $$
> \det(\lambda I-A)
> =
> (\lambda-1)^2(\lambda-5).
> $$
>
> So the eigenvalues are
>
> $$
> \lambda=5,
> \qquad
> \lambda=1.
> $$
>
> The dominant eigenvalue is
>
> $$
> \lambda_1=5.
> $$
>
> Now find the dominant eigenvector.
>
> Solve
>
> $$
> (5I-A)v=0.
> $$
>
> Compute
>
> $$
> 5I-A
> =
> \begin{bmatrix}
> 5 & 0 & 0\\
> 0 & 5 & 0\\
> 0 & 0 & 5
> \end{bmatrix}
> -
> \begin{bmatrix}
> 1 & 0 & 1\\
> -1 & 5 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> 4 & 0 & -1\\
> 1 & 0 & 0\\
> 0 & 0 & 4
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> \begin{bmatrix}
> 4 & 0 & -1\\
> 1 & 0 & 0\\
> 0 & 0 & 4
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
> From the second row,
>
> $$
> v_1=0.
> $$
>
> From the third row,
>
> $$
> 4v_3=0,
> $$
>
> so
>
> $$
> v_3=0.
> $$
>
> The first row is then automatically satisfied:
>
> $$
> 4v_1-v_3=0.
> $$
>
> Therefore, $v_2$ is free. Choose
>
> $$
> v_2=1.
> $$
>
> So the dominant eigenvector is
>
> $$
> v_1=
> \begin{bmatrix}
> 0\\
> 1\\
> 0
> \end{bmatrix}.
> $$
>
> Now apply the power method.
>
> Start with
>
> $$
> q_0=
> \begin{bmatrix}
> 1\\
> -1\\
> 1
> \end{bmatrix}.
> $$
>
> First multiply:
>
> $$
> Aq_0
> =
> \begin{bmatrix}
> 1 & 0 & 1\\
> -1 & 5 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> -1\\
> 1
> \end{bmatrix}.
> $$
>
> Compute each entry:
>
> $$
> Aq_0
> =
> \begin{bmatrix}
> 1(1)+0(-1)+1(1)\\
> -1(1)+5(-1)+0(1)\\
> 0(1)+0(-1)+1(1)
> \end{bmatrix}
> =
> \begin{bmatrix}
> 2\\
> -6\\
> 1
> \end{bmatrix}.
> $$
>
> Normalize by the entry with largest magnitude:
>
> $$
> s=-6.
> $$
>
> Therefore,
>
> $$
> q_1
> =
> \frac{1}{-6}
> \begin{bmatrix}
> 2\\
> -6\\
> 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> -\frac13\\
> 1\\
> -\frac16
> \end{bmatrix}.
> $$
>
> Multiply again:
>
> $$
> Aq_1
> =
> \begin{bmatrix}
> 1 & 0 & 1\\
> -1 & 5 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> \begin{bmatrix}
> -\frac13\\
> 1\\
> -\frac16
> \end{bmatrix}.
> $$
>
> Compute each entry:
>
> $$
> Aq_1
> =
> \begin{bmatrix}
> -\frac13-\frac16\\
> -\left(-\frac13\right)+5\\
> -\frac16
> \end{bmatrix}
> =
> \begin{bmatrix}
> -\frac12\\
> \frac{16}{3}\\
> -\frac16
> \end{bmatrix}.
> $$
>
> Normalize by
>
> $$
> s=\frac{16}{3}.
> $$
>
> Therefore,
>
> $$
> q_2
> =
> \frac{1}{16/3}
> \begin{bmatrix}
> -\frac12\\
> \frac{16}{3}\\
> -\frac16
> \end{bmatrix}
> =
> \begin{bmatrix}
> -\frac{3}{32}\\
> 1\\
> -\frac{1}{32}
> \end{bmatrix}.
> $$
>
> Multiply one more time:
>
> $$
> Aq_2
> =
> \begin{bmatrix}
> 1 & 0 & 1\\
> -1 & 5 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> \begin{bmatrix}
> -\frac{3}{32}\\
> 1\\
> -\frac{1}{32}
> \end{bmatrix}.
> $$
>
> Compute each entry:
>
> $$
> Aq_2
> =
> \begin{bmatrix}
> -\frac{3}{32}-\frac{1}{32}\\
> -\left(-\frac{3}{32}\right)+5\\
> -\frac{1}{32}
> \end{bmatrix}
> =
> \begin{bmatrix}
> -\frac18\\
> \frac{163}{32}\\
> -\frac{1}{32}
> \end{bmatrix}.
> $$
>
> Normalize by
>
> $$
> s=\frac{163}{32}.
> $$
>
> Therefore,
>
> $$
> q_3
> =
> \frac{1}{163/32}
> \begin{bmatrix}
> -\frac18\\
> \frac{163}{32}\\
> -\frac{1}{32}
> \end{bmatrix}
> =
> \begin{bmatrix}
> -\frac{4}{163}\\
> 1\\
> -\frac{1}{163}
> \end{bmatrix}.
> $$
>
> So the iterates are approaching
>
> $$
> \begin{bmatrix}
> 0\\
> 1\\
> 0
> \end{bmatrix}.
> $$
>
> The scaling values are
>
> $$
> -6,
> \qquad
> \frac{16}{3},
> \qquad
> \frac{163}{32},
> \ldots
> $$
>
> and these approach
>
> $$
> 5.
> $$
>
> Therefore, the power method approximates
>
> $$
> \lambda_1=5,
> \qquad
> v_1=
> \begin{bmatrix}
> 0\\
> 1\\
> 0
> \end{bmatrix}.
> $$

---

# Return to the SVD

## Eigenvalues vs. Singular Values

> [!note] General Relationship
> In general, there is no particular relationship between the eigenvalues of
> $A$ and the singular values of $A$.
>
> Singular values are always nonnegative:
>
> $$
> \sigma_i\ge 0.
> $$
>
> Eigenvalues can be positive, negative, zero, or complex.

---

## Special Relationship for Normal Matrices

> [!note] Normal Matrix Case
> For normal matrices, there is a special relationship between eigenvalues and
> singular values.
>
> A matrix is normal if
>
> $$
> A^*A=AA^*.
> $$

> [!abstract] Key Result
> If $A$ is normal and has eigendecomposition
>
> $$
> A=U\Lambda U^*,
> $$
>
> where
>
> $$
> U^*U=UU^*=I,
> $$
>
> and
>
> $$
> \Lambda=
> \begin{bmatrix}
> \lambda_1 & 0 & \cdots & 0\\
> 0 & \lambda_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \lambda_n
> \end{bmatrix},
> $$
>
> then the singular values of $A$ are
>
> $$
> \sigma_i=|\lambda_i|.
> $$

> [!success]- Derivation
> Since $A$ is normal, it has a unitary eigendecomposition:
>
> $$
> A=U\Lambda U^*.
> $$
>
> Here
>
> $$
> U^*U=UU^*=I.
> $$
>
> Write each eigenvalue in polar form:
>
> $$
> \lambda_i=r_ie^{i\theta_i},
> $$
>
> where
>
> $$
> r_i=|\lambda_i|>0.
> $$
>
> Therefore,
>
> $$
> \Lambda
> =
> \begin{bmatrix}
> r_1e^{i\theta_1} & 0 & \cdots & 0\\
> 0 & r_2e^{i\theta_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & r_ne^{i\theta_n}
> \end{bmatrix}.
> $$
>
> Split this diagonal matrix into two diagonal matrices:
>
> $$
> \Lambda
> =
> \begin{bmatrix}
> r_1 & 0 & \cdots & 0\\
> 0 & r_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & r_n
> \end{bmatrix}
> \begin{bmatrix}
> e^{i\theta_1} & 0 & \cdots & 0\\
> 0 & e^{i\theta_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & e^{i\theta_n}
> \end{bmatrix}.
> $$
>
> Substitute this into
>
> $$
> A=U\Lambda U^*.
> $$
>
> Then
>
> $$
> A
> =
> U
> \begin{bmatrix}
> r_1 & 0 & \cdots & 0\\
> 0 & r_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & r_n
> \end{bmatrix}
> \begin{bmatrix}
> e^{i\theta_1} & 0 & \cdots & 0\\
> 0 & e^{i\theta_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & e^{i\theta_n}
> \end{bmatrix}
> U^*.
> $$
>
> The matrix
>
> $$
> \begin{bmatrix}
> e^{i\theta_1} & 0 & \cdots & 0\\
> 0 & e^{i\theta_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & e^{i\theta_n}
> \end{bmatrix}
> $$
>
> is unitary because each diagonal entry has magnitude $1$:
>
> $$
> |e^{i\theta_i}|=1.
> $$
>
> Since the product of unitary matrices is unitary, this is an SVD of $A$:
>
> $$
> A=
> U
> \begin{bmatrix}
> r_1 & 0 & \cdots & 0\\
> 0 & r_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & r_n
> \end{bmatrix}
> V^*.
> $$
>
> Therefore, the singular values are
>
> $$
> \sigma_i=r_i.
> $$
>
> Since
>
> $$
> r_i=|\lambda_i|,
> $$
>
> we get
>
> $$
> \sigma_i=|\lambda_i|.
> $$

---

## What About Non-Normal Matrices?

> [!note] Non-Normal Case
> For a non-normal matrix, the eigenvalues of $A$ usually do not directly give
> the singular values of $A$.
>
> Instead, we use the relationship between SVD and the eigendecomposition of
> $A^TA$.

---

# Computing SVD from $A^TA$

## Key Relationship

> [!note] Relationship Between $A^TA$ and SVD
> Suppose
>
> $$
> A=U\Sigma V^T.
> $$
>
> Then
>
> $$
> A^T=V\Sigma^TU^T.
> $$
>
> Therefore,
>
> $$
> A^TA
> =
> V\Sigma^TU^TU\Sigma V^T.
> $$
>
> Since
>
> $$
> U^TU=I,
> $$
>
> we get
>
> $$
> A^TA
> =
> V\Sigma^T\Sigma V^T.
> $$

> [!note] Explicit Matrix Form
> The matrix
>
> $$
> \Sigma^T\Sigma
> $$
>
> is diagonal with squared singular values:
>
> $$
> \Sigma^T\Sigma
> =
> \begin{bmatrix}
> \sigma_1^2 & 0 & \cdots & 0\\
> 0 & \sigma_2^2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \sigma_n^2
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> A^TA
> =
> V
> \begin{bmatrix}
> \sigma_1^2 & 0 & \cdots & 0\\
> 0 & \sigma_2^2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \sigma_n^2
> \end{bmatrix}
> V^T.
> $$

> [!abstract] Consequence
> The eigenvalues of $A^TA$ are
>
> $$
> \sigma_1^2,\sigma_2^2,\ldots,\sigma_n^2.
> $$
>
> Therefore,
>
> $$
> \sigma_i=\sqrt{\lambda_i(A^TA)}.
> $$
>
> The eigenvectors of $A^TA$ are the right singular vectors of $A$:
>
> $$
> v_1,\ldots,v_n.
> $$

> [!tip] Left Singular Vectors
> Once we know $\sigma_i$ and $v_i$, use
>
> $$
> Av_i=\sigma_i u_i.
> $$
>
> Therefore,
>
> $$
> u_i=\frac1{\sigma_i}Av_i.
> $$

---

# First Method of Computing SVD

> [!note] Method
> To compute the SVD of $A$:
>
> 1. Compute $A^TA$.
> 2. Find the eigendecomposition of $A^TA$.
> 3. Sort the eigenvalues.
> 4. Set $\sigma_i=\sqrt{\lambda_i}$.
> 5. Compute $u_i=\frac1{\sigma_i}Av_i$.

> [!note] Matrix Version
> Compute
>
> $$
> A^TA=VDV^T,
> $$
>
> where
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
> Sort
>
> $$
> \lambda_1\ge \lambda_2\ge \cdots \ge \lambda_n.
> $$
>
> Then
>
> $$
> \sigma_i=\sqrt{\lambda_i}.
> $$
>
> Finally,
>
> $$
> u_i=\frac1{\sigma_i}Av_i.
> $$

---

# Example: Computing SVD from $A^TA$

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> -1 & 1\\
> 0 & 1\\
> 1 & 0
> \end{bmatrix}.
> $$
>
> We compute the SVD using $A^TA$.

> [!success]- Solution
> First compute $A^TA$.
>
> $$
> A^T
> =
> \begin{bmatrix}
> -1 & 0 & 1\\
> 1 & 1 & 0
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> A^TA
> =
> \begin{bmatrix}
> -1 & 0 & 1\\
> 1 & 1 & 0
> \end{bmatrix}
> \begin{bmatrix}
> -1 & 1\\
> 0 & 1\\
> 1 & 0
> \end{bmatrix}.
> $$
>
> Multiplying:
>
> $$
> A^TA
> =
> \begin{bmatrix}
> (-1)(-1)+0(0)+1(1) & (-1)(1)+0(1)+1(0)\\
> 1(-1)+1(0)+0(1) & 1(1)+1(1)+0(0)
> \end{bmatrix}.
> $$
>
> So
>
> $$
> A^TA
> =
> \begin{bmatrix}
> 2 & -1\\
> -1 & 2
> \end{bmatrix}.
> $$
>
> Now find the eigenvalues of $A^TA$.
>
> $$
> \det(\lambda I-A^TA)
> =
> \det
> \left(
> \begin{bmatrix}
> \lambda & 0\\
> 0 & \lambda
> \end{bmatrix}
> -
> \begin{bmatrix}
> 2 & -1\\
> -1 & 2
> \end{bmatrix}
> \right).
> $$
>
> Therefore,
>
> $$
> \lambda I-A^TA
> =
> \begin{bmatrix}
> \lambda-2 & 1\\
> 1 & \lambda-2
> \end{bmatrix}.
> $$
>
> Hence,
>
> $$
> \det(\lambda I-A^TA)
> =
> \det
> \begin{bmatrix}
> \lambda-2 & 1\\
> 1 & \lambda-2
> \end{bmatrix}
> =
> (\lambda-2)^2-1.
> $$
>
> Expand:
>
> $$
> (\lambda-2)^2-1
> =
> \lambda^2-4\lambda+4-1
> =
> \lambda^2-4\lambda+3.
> $$
>
> Factor:
>
> $$
> \lambda^2-4\lambda+3
> =
> (\lambda-3)(\lambda-1).
> $$
>
> Thus
>
> $$
> \lambda_1=3,
> \qquad
> \lambda_2=1.
> $$
>
> Therefore, the singular values are
>
> $$
> \sigma_1=\sqrt3,
> \qquad
> \sigma_2=1.
> $$
>
> Now find the eigenvectors of $A^TA$.
>
> For
>
> $$
> \lambda_1=3,
> $$
>
> solve
>
> $$
> (3I-A^TA)v=0.
> $$
>
> Compute
>
> $$
> 3I-A^TA
> =
> \begin{bmatrix}
> 3 & 0\\
> 0 & 3
> \end{bmatrix}
> -
> \begin{bmatrix}
> 2 & -1\\
> -1 & 2
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1 & 1\\
> 1 & 1
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> \begin{bmatrix}
> 1 & 1\\
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
> v_2=-v_1.
> $$
>
> Choose
>
> $$
> v=
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}.
> $$
>
> Normalize:
>
> $$
> v_1=
> \frac1{\sqrt2}
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}.
> $$
>
> For
>
> $$
> \lambda_2=1,
> $$
>
> solve
>
> $$
> (I-A^TA)v=0.
> $$
>
> Compute
>
> $$
> I-A^TA
> =
> \begin{bmatrix}
> 1 & 0\\
> 0 & 1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 2 & -1\\
> -1 & 2
> \end{bmatrix}
> =
> \begin{bmatrix}
> -1 & 1\\
> 1 & -1
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> \begin{bmatrix}
> -1 & 1\\
> 1 & -1
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
> -v_1+v_2=0.
> $$
>
> Hence
>
> $$
> v_1=v_2.
> $$
>
> Choose
>
> $$
> v=
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Normalize:
>
> $$
> v_2=
> \frac1{\sqrt2}
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Now compute the left singular vectors using
>
> $$
> u_i=\frac1{\sigma_i}Av_i.
> $$
>
> First,
>
> $$
> u_1=\frac1{\sigma_1}Av_1.
> $$
>
> Since
>
> $$
> \sigma_1=\sqrt3,
> \qquad
> v_1=
> \frac1{\sqrt2}
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix},
> $$
>
> we get
>
> $$
> u_1
> =
> \frac1{\sqrt3}
> \begin{bmatrix}
> -1 & 1\\
> 0 & 1\\
> 1 & 0
> \end{bmatrix}
> \frac1{\sqrt2}
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}.
> $$
>
> First multiply:
>
> $$
> A
> \begin{bmatrix}
> 1\\
> -1
> \end{bmatrix}
> =
> \begin{bmatrix}
> -1(1)+1(-1)\\
> 0(1)+1(-1)\\
> 1(1)+0(-1)
> \end{bmatrix}
> =
> \begin{bmatrix}
> -2\\
> -1\\
> 1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> u_1
> =
> \frac1{\sqrt6}
> \begin{bmatrix}
> -2\\
> -1\\
> 1
> \end{bmatrix}.
> $$
>
> Next,
>
> $$
> u_2=\frac1{\sigma_2}Av_2.
> $$
>
> Since
>
> $$
> \sigma_2=1,
> \qquad
> v_2=
> \frac1{\sqrt2}
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix},
> $$
>
> we get
>
> $$
> u_2
> =
> \begin{bmatrix}
> -1 & 1\\
> 0 & 1\\
> 1 & 0
> \end{bmatrix}
> \frac1{\sqrt2}
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> First multiply:
>
> $$
> A
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> -1(1)+1(1)\\
> 0(1)+1(1)\\
> 1(1)+0(1)
> \end{bmatrix}
> =
> \begin{bmatrix}
> 0\\
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> u_2
> =
> \frac1{\sqrt2}
> \begin{bmatrix}
> 0\\
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Therefore, the reduced SVD of $A$ is
>
> $$
> A=U_2\Sigma_2V_2^T,
> $$
>
> where
>
> $$
> U_2=
> \begin{bmatrix}
> -\frac{2}{\sqrt6} & 0\\
> -\frac{1}{\sqrt6} & \frac1{\sqrt2}\\
> \frac1{\sqrt6} & \frac1{\sqrt2}
> \end{bmatrix},
> $$
>
> $$
> \Sigma_2=
> \begin{bmatrix}
> \sqrt3 & 0\\
> 0 & 1
> \end{bmatrix},
> $$
>
> and
>
> $$
> V_2^T=
> \begin{bmatrix}
> \frac1{\sqrt2} & -\frac1{\sqrt2}\\
> \frac1{\sqrt2} & \frac1{\sqrt2}
> \end{bmatrix}.
> $$
>
> Thus
>
> $$
> A
> =
> \begin{bmatrix}
> -\frac{2}{\sqrt6} & 0\\
> -\frac{1}{\sqrt6} & \frac1{\sqrt2}\\
> \frac1{\sqrt6} & \frac1{\sqrt2}
> \end{bmatrix}
> \begin{bmatrix}
> \sqrt3 & 0\\
> 0 & 1
> \end{bmatrix}
> \begin{bmatrix}
> \frac1{\sqrt2} & -\frac1{\sqrt2}\\
> \frac1{\sqrt2} & \frac1{\sqrt2}
> \end{bmatrix}.
> $$

---

# Accuracy Issue with $A^TA$

## Condition Number Issue

> [!warning] Accuracy Problem
> We saw in homework that
>
> $$
> \kappa_2(A^TA)=\kappa_2(A)^2.
> $$
>
> So forming $A^TA$ squares the condition number.

> [!tip] Meaning
> A higher condition number means worse numerical accuracy.
>
> Therefore, computing the SVD through $A^TA$ is not very accurate when $A$ is
> ill-conditioned.

---

# Second Method for Computing SVD

## Block Matrix Idea

> [!note] Insight
> A better method uses the block matrix
>
> $$
> X=
> \begin{bmatrix}
> 0 & A\\
> A^T & 0
> \end{bmatrix}.
> $$
>
> If
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> then
>
> $$
> X\in\mathbb{R}^{(m+n)\times(m+n)}.
> $$

> [!tip] Main Idea
> The eigenvalues and eigenvectors of $X$ contain the singular values and
> singular vectors of $A$.

---

## Eigenpairs of the Block Matrix

> [!abstract] Key Fact
> Suppose
>
> $$
> A=U\Sigma V^T.
> $$
>
> Then
>
> $$
> Av_i=\sigma_i u_i,
> \qquad
> A^Tu_i=\sigma_i v_i.
> $$
>
> Define
>
> $$
> X=
> \begin{bmatrix}
> 0 & A\\
> A^T & 0
> \end{bmatrix}.
> $$
>
> Then $X$ has eigenpairs of the form
>
> $$
> \left(
> \sigma_i,
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}
> \right),
> \qquad
> 1\le i\le n,
> $$
>
> and
>
> $$
> \left(
> -\sigma_i,
> \begin{bmatrix}
> u_i\\
> -v_i
> \end{bmatrix}
> \right),
> \qquad
> 1\le i\le n.
> $$

> [!success]- Quick Check
> Let
>
> $$
> X=
> \begin{bmatrix}
> 0 & A\\
> A^T & 0
> \end{bmatrix}.
> $$
>
> First check the positive eigenvalue:
>
> $$
> X
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}
> =
> \begin{bmatrix}
> 0 & A\\
> A^T & 0
> \end{bmatrix}
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}
> =
> \begin{bmatrix}
> Av_i\\
> A^Tu_i
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> Av_i=\sigma_i u_i,
> \qquad
> A^Tu_i=\sigma_i v_i,
> $$
>
> we get
>
> $$
> X
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}
> =
> \begin{bmatrix}
> \sigma_i u_i\\
> \sigma_i v_i
> \end{bmatrix}
> =
> \sigma_i
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \left(
> \sigma_i,
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}
> \right)
> $$
>
> is an eigenpair of $X$.
>
> Now check the negative eigenvalue:
>
> $$
> X
> \begin{bmatrix}
> u_i\\
> -v_i
> \end{bmatrix}
> =
> \begin{bmatrix}
> 0 & A\\
> A^T & 0
> \end{bmatrix}
> \begin{bmatrix}
> u_i\\
> -v_i
> \end{bmatrix}
> =
> \begin{bmatrix}
> -Av_i\\
> A^Tu_i
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> Av_i=\sigma_i u_i,
> \qquad
> A^Tu_i=\sigma_i v_i,
> $$
>
> we get
>
> $$
> X
> \begin{bmatrix}
> u_i\\
> -v_i
> \end{bmatrix}
> =
> \begin{bmatrix}
> -\sigma_i u_i\\
> \sigma_i v_i
> \end{bmatrix}.
> $$
>
> Factor out $-\sigma_i$:
>
> $$
> \begin{bmatrix}
> -\sigma_i u_i\\
> \sigma_i v_i
> \end{bmatrix}
> =
> -\sigma_i
> \begin{bmatrix}
> u_i\\
> -v_i
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \left(
> -\sigma_i,
> \begin{bmatrix}
> u_i\\
> -v_i
> \end{bmatrix}
> \right)
> $$
>
> is also an eigenpair of $X$.

---

## Zero Eigenvalues

> [!note] Extra Zero Eigenpairs
> If
>
> $$
> m>n,
> $$
>
> then $X$ has additional zero eigenvalues.
>
> These correspond to vectors of the form
>
> $$
> \left(
> 0,
> \begin{bmatrix}
> u_i\\
> 0
> \end{bmatrix}
> \right),
> \qquad
> n+1\le i\le m.
> $$

---

## How This Computes the SVD

> [!note] Recovering SVD from $X$
> We can compute eigenvalues and eigenvectors of
>
> $$
> X=
> \begin{bmatrix}
> 0 & A\\
> A^T & 0
> \end{bmatrix}.
> $$
>
> If we find an eigenpair
>
> $$
> \left(
> \sigma_i,
> \begin{bmatrix}
> u_i\\
> v_i
> \end{bmatrix}
> \right),
> $$
>
> then $\sigma_i$ is a singular value of $A$, $u_i$ is a left singular vector,
> and $v_i$ is a right singular vector.

---

# Issues with the Block Matrix Method

## Singularity and Opposite Signs

> [!warning] Two Issues
> This method has two issues:
>
> 1. If
>
> $$
> m>n,
> $$
>
> then $X$ is singular.
>
> 2. Eigenvalues come in pairs of opposite sign:
>
> $$
> \sigma_i,
> \qquad
> -\sigma_i.
> $$

---

## Fix: Shifted Block Matrix

> [!note] Shifted Matrix
> To avoid these issues, compute eigenvalues of
>
> $$
> X+\mu I,
> $$
>
> where $\mu$ is a random shift.

> [!note] Eigenvalues After the Shift
> If the eigenvalues of $X$ are
>
> $$
> \sigma_i,
> \qquad
> -\sigma_i,
> \qquad
> 0,
> $$
>
> then the eigenvalues of
>
> $$
> X+\mu I
> $$
>
> are
>
> $$
> \sigma_i+\mu,
> \qquad
> -\sigma_i+\mu,
> \qquad
> \mu.
> $$

> [!tip] Why This Helps
> The shift separates the eigenvalues and avoids the symmetry around zero.
>
> This is a much better method in general.