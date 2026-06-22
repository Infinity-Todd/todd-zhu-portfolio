# Lecture 27 - Complexity Analysis for Jacobi and Gauss-Seidel

> [!info] Lecture Overview
> Topics:
>
> - Flops per iteration for Jacobi
> - Flops per iteration for Gauss-Seidel
> - Total cost = flops per iteration $\times$ number of iterations
> - Convergence criterion
> - What drives convergence
> - Error recurrence
> - Iteration matrix
> - Number of iterations needed
> - Jacobi example
> - Gauss-Seidel example
> - Checking convergence using eigenvalues
> - Jacobi and Gauss-Seidel comparison

---
# Jacobi and Gauss-Seidel

## Coordinate Form

> [!note] Jacobi Coordinate Formula
> For solving
>
> $$
> Ax=b,
> $$
>
> the Jacobi method updates each coordinate by
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}
> \right),
> \qquad
> 1\le i\le n.
> $$
>
> Jacobi uses only old values from step $k$.

> [!note] Gauss-Seidel Coordinate Formula
> Gauss-Seidel updates by
>
> $$
> x_i^{(k+1)}
> =
> \frac1{a_{ii}}
> \left(
> b_i
> -
> \sum_{j<i}a_{ij}x_j^{(k+1)}
> -
> \sum_{j>i}a_{ij}x_j^{(k)}
> \right),
> \qquad
> 1\le i\le n.
> $$
>
> Gauss-Seidel uses the newest available values immediately.

---

## Matrix Form

> [!note] Jacobi Matrix Form
> For Jacobi, define $D$ as the diagonal part of $A$.
>
> Then
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> and
>
> $$
> x^{(k+1)}=D^{-1}r^{(k)}+x^{(k)}.
> $$

> [!note] Gauss-Seidel Matrix Form
> For Gauss-Seidel, write
>
> $$
> A=L+D+U,
> $$
>
> where:
>
> - $L$ is the strictly lower triangular part
> - $D$ is the diagonal part
> - $U$ is the strictly upper triangular part
>
> The notes write the Gauss-Seidel residual form as
>
> $$
> r^{(k)}=b-Ax^{(k)},
> $$
>
> and
>
> $$
> x^{(k+1)}=(A-U)^{-1}r^{(k)}+x^{(k)}.
> $$

---

# Flops Per Iteration

## Jacobi Cost

> [!success]- Jacobi Flop Count
> For one Jacobi iteration, we compute
>
> $$
> r^{(k)}=b-Ax^{(k)}.
> $$
>
> Computing
>
> $$
> Ax^{(k)}
> $$
>
> for a dense
>
> $$
> n\times n
> $$
>
> matrix costs about
>
> $$
> 2n^2
> $$
>
> flops.
>
> Then we compute
>
> $$
> x^{(k+1)}=D^{-1}r^{(k)}+x^{(k)}.
> $$
>
> Since $D^{-1}$ is diagonal, multiplying by $D^{-1}$ costs about
>
> $$
> n
> $$
>
> flops.
>
> Adding the vector
>
> $$
> x^{(k)}
> $$
>
> costs another
>
> $$
> n
> $$
>
> flops.
>
> So the lower-order vector operations cost about
>
> $$
> O(n).
> $$
>
> Therefore, the total cost per Jacobi iteration is
>
> $$
> 2n^2+O(n).
> $$
>
> Thus,
>
> $$
> \boxed{
> \text{Jacobi cost per iteration}\approx 2n^2
> }.
> $$

---

## Gauss-Seidel Cost

> [!success]- Gauss-Seidel Flop Count
> For Gauss-Seidel, we also compute
>
> $$
> r^{(k)}=b-Ax^{(k)}.
> $$
>
> This costs about
>
> $$
> 2n^2
> $$
>
> flops for a dense matrix.
>
> Then we compute
>
> $$
> x^{(k+1)}=(A-U)^{-1}r^{(k)}+x^{(k)}.
> $$
>
> The matrix
>
> $$
> A-U
> $$
>
> is lower triangular, because $U$ is the strictly upper triangular part of
> $A$.
>
> So applying
>
> $$
> (A-U)^{-1}
> $$
>
> means solving a lower triangular system by forward substitution.
>
> Forward substitution costs about
>
> $$
> n^2
> $$
>
> flops.
>
> Therefore, the total cost is
>
> $$
> 2n^2+n^2+O(n).
> $$
>
> Hence
>
> $$
> \boxed{
> \text{Gauss-Seidel cost per iteration}
> \approx 3n^2
> }.
> $$
>
> The extra
>
> $$
> n^2
> $$
>
> comes from the forward substitution step.

---

## Summary of Per-Iteration Cost

> [!summary] Per-Iteration Flop Count
> Jacobi:
>
> $$
> \boxed{
> O(n^2)
> }
> $$
>
> more specifically about
>
> $$
> 2n^2
> $$
>
> flops per iteration.
>
> Gauss-Seidel:
>
> $$
> \boxed{
> O(n^2)
> }
> $$
>
> more specifically about
>
> $$
> 3n^2
> $$
>
> flops per iteration.
>
> Gauss-Seidel is slightly more expensive per iteration because of the extra
> forward substitution step.

---

# Total Cost

## Flops Per Iteration Times Number of Iterations

> [!note] Total Cost
> The total cost is:
>
> $$
> \text{total cost}
> =
> \text{flops per iteration}
> \times
> \text{number of iterations}.
> $$
>
> If the method takes
>
> $$
> k
> $$
>
> iterations, then the total cost is approximately:
>
> $$
> O(kn^2).
> $$

> [!tip] Comparison with Direct Methods
> Direct methods like Gaussian elimination, LU, or PLU usually cost
>
> $$
> O(n^3).
> $$
>
> Iterative methods can be much cheaper if the number of iterations $k$ is much
> smaller than $n$.

---

# Convergence Criterion

## Stopping Rule

> [!note] Convergence Criterion
> A common stopping rule is:
>
> $$
> \|x^{(k+1)}-x^{(k)}\|_2<\varepsilon.
> $$
>
> Here
>
> $$
> \varepsilon
> $$
>
> is the chosen tolerance.

> [!tip] Meaning
> If two consecutive iterates are very close, then the iteration is no longer
> changing much.
>
> So we stop and use
>
> $$
> x^{(k+1)}
> $$
>
> as the approximate solution.

---

# What Drives Convergence?

## Error Vector

> [!note] Error Vector
> Let
>
> $$
> \bar{x}
> $$
>
> be the exact solution to
>
> $$
> Ax=b.
> $$
>
> Define the error vector:
>
> $$
> e^{(k)}=\bar{x}-x^{(k)}.
> $$

---

## Error Recurrence

> [!abstract] Error Recurrence
> The notes write the error recurrence as
>
> $$
> e^{(k)}=M^ke^{(0)}.
> $$
>
> Here $M$ is the iteration matrix.

> [!note] Jacobi Iteration Matrix
> For Jacobi,
>
> $$
> M_J=I-D^{-1}A.
> $$

> [!note] Gauss-Seidel Iteration Matrix
> For Gauss-Seidel,
>
> $$
> M_{GS}=I-(A-U)^{-1}A.
> $$

---

## Why Eigenvalues Matter

> [!success]- Derivation
> Suppose the iteration matrix $M$ has eigenvectors
>
> $$
> v_1,v_2,\ldots,v_n,
> $$
>
> and assume $M$ is diagonalizable.
>
> Write the initial error as a linear combination of eigenvectors:
>
> $$
> e^{(0)}
> =
> \sum_{i=1}^n c_iv_i.
> $$
>
> Then
>
> $$
> Me^{(0)}
> =
> M\sum_{i=1}^n c_iv_i.
> $$
>
> Distribute:
>
> $$
> Me^{(0)}
> =
> \sum_{i=1}^n c_iMv_i.
> $$
>
> Since
>
> $$
> Mv_i=\lambda_i v_i,
> $$
>
> we get
>
> $$
> Me^{(0)}
> =
> \sum_{i=1}^n c_i\lambda_i v_i.
> $$
>
> Applying $M$ again:
>
> $$
> M^2e^{(0)}
> =
> \sum_{i=1}^n c_i\lambda_i^2v_i.
> $$
>
> Continuing this process,
>
> $$
> M^ke^{(0)}
> =
> \sum_{i=1}^n c_i\lambda_i^kv_i.
> $$
>
> Since
>
> $$
> e^{(k)}=M^ke^{(0)},
> $$
>
> we have
>
> $$
> e^{(k)}
> =
> \sum_{i=1}^n c_i\lambda_i^kv_i.
> $$
>
> If
>
> $$
> |\lambda_i|<1
> $$
>
> for every eigenvalue, then
>
> $$
> \lambda_i^k\to 0
> \qquad
> \text{as } k\to\infty.
> $$
>
> Therefore,
>
> $$
> e^{(k)}\to 0.
> $$
>
> This means the iteration converges.

---

## Convergence Condition

> [!abstract] Convergence Condition
> Jacobi or Gauss-Seidel converges if all eigenvalues of its iteration matrix
> satisfy
>
> $$
> |\lambda_i|<1.
> $$
>
> Equivalently,
>
> $$
> \rho(M)<1,
> $$
>
> where
>
> $$
> \rho(M)=\max_i|\lambda_i|
> $$
>
> is the spectral radius.

---

# Number of Iterations Needed

## Bounding the Error

> [!success]- Derivation
> From the error recurrence,
>
> $$
> e^{(k)}=M^ke^{(0)}.
> $$
>
> If the eigenvalues satisfy
>
> $$
> |\lambda_i|<1,
> $$
>
> then the slowest-decaying term is controlled by the largest absolute
> eigenvalue:
>
> $$
> |\lambda|
> =
> \max_i|\lambda_i|.
> $$
>
> The notes write a bound of the form:
>
> $$
> \|M^ke^{(0)}\|_2
> \le
> Cn|\lambda|^k.
> $$
>
> Here $C$ is a constant depending on the initial error and eigenvectors.
>
> To make the error smaller than the tolerance, we need
>
> $$
> Cn|\lambda|^k\le \varepsilon.
> $$
>
> Take logs:
>
> $$
> \ln(Cn|\lambda|^k)\le \ln\varepsilon.
> $$
>
> Expand:
>
> $$
> \ln C+\ln n+k\ln|\lambda|
> \le
> \ln\varepsilon.
> $$
>
> Rearrange:
>
> $$
> k\ln|\lambda|
> \le
> \ln\varepsilon-\ln C-\ln n.
> $$
>
> Since
>
> $$
> |\lambda|<1,
> $$
>
> we have
>
> $$
> \ln|\lambda|<0.
> $$
>
> Dividing by a negative number reverses the inequality:
>
> $$
> k
> \ge
> \frac{
> \ln\varepsilon-\ln C-\ln n
> }{
> \ln|\lambda|
> }.
> $$
>
> Equivalently, the number of iterations is proportional to
>
> $$
> \ln\left(\frac1\varepsilon\right).
> $$
>
> It is inversely proportional to
>
> $$
> \ln|\lambda|.
> $$
>
> It may also contain a
>
> $$
> \ln n
> $$
>
> term.

> [!summary] Iteration Count
> The notes summarize:
>
> $$
> \text{number of iterations}
> =
> O\left(\ln\frac1\varepsilon\right).
> $$
>
> More precisely, it depends on:
>
> - the tolerance $\varepsilon$
> - the largest eigenvalue magnitude $|\lambda|$
> - possibly a $\ln n$ term

---

## Overall Cost

> [!summary] Overall Cost
> Since each iteration costs
>
> $$
> O(n^2),
> $$
>
> and the number of iterations is roughly
>
> $$
> O\left(\ln\frac1\varepsilon\right),
> $$
>
> the total cost is roughly
>
> $$
> O\left(n^2\ln\frac1\varepsilon\right).
> $$
>
> This can be much cheaper than direct methods:
>
> $$
> O(n^3).
> $$

---

# Example: Jacobi Method

> [!example] Jacobi Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 5 & 0 & 1\\
> -1 & 3 & 1\\
> 0 & 1 & 4
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> 11\\
> -4\\
> 3
> \end{bmatrix},
> \qquad
> x^{(0)}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> Use Jacobi iteration.

> [!success]- Solution
> The system is
>
> $$
> \begin{bmatrix}
> 5 & 0 & 1\\
> -1 & 3 & 1\\
> 0 & 1 & 4
> \end{bmatrix}
> \begin{bmatrix}
> x_1\\
> x_2\\
> x_3
> \end{bmatrix}
> =
> \begin{bmatrix}
> 11\\
> -4\\
> 3
> \end{bmatrix}.
> $$
>
> Written as equations:
>
> $$
> 5x_1+x_3=11,
> $$
>
> $$
> -x_1+3x_2+x_3=-4,
> $$
>
> $$
> x_2+4x_3=3.
> $$
>
> Solve each equation for its diagonal variable:
>
> $$
> x_1=\frac{11-x_3}{5},
> $$
>
> $$
> x_2=\frac{-4+x_1-x_3}{3},
> $$
>
> $$
> x_3=\frac{3-x_2}{4}.
> $$
>
> Therefore, Jacobi iteration is:
>
> $$
> x_1^{(k+1)}
> =
> \frac{11-x_3^{(k)}}{5},
> $$
>
> $$
> x_2^{(k+1)}
> =
> \frac{-4+x_1^{(k)}-x_3^{(k)}}{3},
> $$
>
> $$
> x_3^{(k+1)}
> =
> \frac{3-x_2^{(k)}}{4}.
> $$
>
> Start with
>
> $$
> x^{(0)}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> First iteration:
>
> $$
> x_1^{(1)}
> =
> \frac{11-0}{5}
> =
> 2.2,
> $$
>
> $$
> x_2^{(1)}
> =
> \frac{-4+0-0}{3}
> =
> -\frac43
> \approx -1.33,
> $$
>
> $$
> x_3^{(1)}
> =
> \frac{3-0}{4}
> =
> 0.75.
> $$
>
> Hence
>
> $$
> x^{(1)}
> \approx
> \begin{bmatrix}
> 2.2\\
> -1.33\\
> 0.75
> \end{bmatrix}.
> $$
>
> Second iteration:
>
> $$
> x_1^{(2)}
> =
> \frac{11-0.75}{5}
> =
> \frac{10.25}{5}
> =
> 2.05,
> $$
>
> $$
> x_2^{(2)}
> =
> \frac{-4+2.2-0.75}{3}
> =
> \frac{-2.55}{3}
> =
> -0.85,
> $$
>
> $$
> x_3^{(2)}
> =
> \frac{3-(-1.33)}{4}
> =
> \frac{4.33}{4}
> \approx 1.08.
> $$
>
> Hence
>
> $$
> x^{(2)}
> \approx
> \begin{bmatrix}
> 2.05\\
> -0.85\\
> 1.08
> \end{bmatrix}.
> $$
>
> Third iteration:
>
> $$
> x_1^{(3)}
> =
> \frac{11-1.08}{5}
> =
> \frac{9.92}{5}
> \approx 1.98,
> $$
>
> $$
> x_2^{(3)}
> =
> \frac{-4+2.05-1.08}{3}
> =
> \frac{-3.03}{3}
> \approx -1.01,
> $$
>
> $$
> x_3^{(3)}
> =
> \frac{3-(-0.85)}{4}
> =
> \frac{3.85}{4}
> \approx 0.96.
> $$
>
> Therefore,
>
> $$
> x^{(3)}
> \approx
> \begin{bmatrix}
> 1.98\\
> -1.01\\
> 0.96
> \end{bmatrix}.
> $$
>
> The true solution is
>
> $$
> \begin{bmatrix}
> 2\\
> -1\\
> 1
> \end{bmatrix}.
> $$
>
> Therefore, the Jacobi iteration appears to converge.

---

# Example: Gauss-Seidel Method

> [!example] Gauss-Seidel Example
> Let
>
> $$
> B=
> \begin{bmatrix}
> 4 & 1 & -1\\
> 0 & 2 & 1\\
> 1 & 0 & -3
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> 6\\
> 1\\
> 4
> \end{bmatrix},
> \qquad
> x^{(0)}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> Use Gauss-Seidel iteration.

> [!success]- Solution
> The system is
>
> $$
> \begin{bmatrix}
> 4 & 1 & -1\\
> 0 & 2 & 1\\
> 1 & 0 & -3
> \end{bmatrix}
> \begin{bmatrix}
> x_1\\
> x_2\\
> x_3
> \end{bmatrix}
> =
> \begin{bmatrix}
> 6\\
> 1\\
> 4
> \end{bmatrix}.
> $$
>
> Written as equations:
>
> $$
> 4x_1+x_2-x_3=6,
> $$
>
> $$
> 2x_2+x_3=1,
> $$
>
> $$
> x_1-3x_3=4.
> $$
>
> Solve each equation for its diagonal variable:
>
> $$
> x_1=\frac{6-x_2+x_3}{4},
> $$
>
> $$
> x_2=\frac{1-x_3}{2},
> $$
>
> $$
> x_3=\frac{4-x_1}{-3}.
> $$
>
> For Gauss-Seidel, use the newest available values:
>
> $$
> x_1^{(k+1)}
> =
> \frac{6-x_2^{(k)}+x_3^{(k)}}{4},
> $$
>
> $$
> x_2^{(k+1)}
> =
> \frac{1-x_3^{(k)}}{2},
> $$
>
> $$
> x_3^{(k+1)}
> =
> \frac{4-x_1^{(k+1)}}{-3}.
> $$
>
> Start with
>
> $$
> x^{(0)}
> =
> \begin{bmatrix}
> 0\\
> 0\\
> 0
> \end{bmatrix}.
> $$
>
> First iteration:
>
> $$
> x_1^{(1)}
> =
> \frac{6-0+0}{4}
> =
> 1.5,
> $$
>
> $$
> x_2^{(1)}
> =
> \frac{1-0}{2}
> =
> 0.5,
> $$
>
> $$
> x_3^{(1)}
> =
> \frac{4-1.5}{-3}
> =
> \frac{2.5}{-3}
> \approx -0.83.
> $$
>
> Hence
>
> $$
> x^{(1)}
> \approx
> \begin{bmatrix}
> 1.5\\
> 0.5\\
> -0.83
> \end{bmatrix}.
> $$
>
> Second iteration:
>
> $$
> x_1^{(2)}
> =
> \frac{6-0.5-0.83}{4}
> =
> \frac{4.67}{4}
> \approx 1.17,
> $$
>
> $$
> x_2^{(2)}
> =
> \frac{1-(-0.83)}{2}
> =
> \frac{1.83}{2}
> \approx 0.92,
> $$
>
> $$
> x_3^{(2)}
> =
> \frac{4-1.17}{-3}
> =
> \frac{2.83}{-3}
> \approx -0.94.
> $$
>
> Hence
>
> $$
> x^{(2)}
> \approx
> \begin{bmatrix}
> 1.17\\
> 0.92\\
> -0.94
> \end{bmatrix}.
> $$
>
> Third iteration:
>
> $$
> x_1^{(3)}
> =
> \frac{6-0.92-0.94}{4}
> =
> \frac{4.14}{4}
> \approx 1.04,
> $$
>
> $$
> x_2^{(3)}
> =
> \frac{1-(-0.94)}{2}
> =
> \frac{1.94}{2}
> \approx 0.97,
> $$
>
> $$
> x_3^{(3)}
> =
> \frac{4-1.04}{-3}
> =
> \frac{2.96}{-3}
> \approx -0.99.
> $$
>
> Thus
>
> $$
> x^{(3)}
> \approx
> \begin{bmatrix}
> 1.04\\
> 0.97\\
> -0.99
> \end{bmatrix}.
> $$
>
> The true answer is
>
> $$
> \begin{bmatrix}
> 1\\
> 1\\
> -1
> \end{bmatrix}.
> $$
>
> So the Gauss-Seidel iteration appears to converge.

---

# Checking Whether Jacobi Converges

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 2 & 0 & 1\\
> -1 & 2 & 0\\
> 0 & 1 & 1
> \end{bmatrix}.
> $$
>
> Will Jacobi converge?

> [!success]- Solution
> For Jacobi, the iteration matrix is
>
> $$
> M=I-D^{-1}A.
> $$
>
> First compute the diagonal part:
>
> $$
> D=
> \begin{bmatrix}
> 2 & 0 & 0\\
> 0 & 2 & 0\\
> 0 & 0 & 1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> D^{-1}
> =
> \begin{bmatrix}
> \frac12 & 0 & 0\\
> 0 & \frac12 & 0\\
> 0 & 0 & 1
> \end{bmatrix}.
> $$
>
> Compute
>
> $$
> D^{-1}A
> =
> \begin{bmatrix}
> \frac12 & 0 & 0\\
> 0 & \frac12 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 2 & 0 & 1\\
> -1 & 2 & 0\\
> 0 & 1 & 1
> \end{bmatrix}.
> $$
>
> Multiplying:
>
> $$
> D^{-1}A
> =
> \begin{bmatrix}
> 1 & 0 & \frac12\\
> -\frac12 & 1 & 0\\
> 0 & 1 & 1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> M
> =
> I-D^{-1}A.
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
> M=
> \begin{bmatrix}
> 1 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 1 & 0 & \frac12\\
> -\frac12 & 1 & 0\\
> 0 & 1 & 1
> \end{bmatrix}.
> $$
>
> Thus
>
> $$
> M=
> \begin{bmatrix}
> 0 & 0 & -\frac12\\
> \frac12 & 0 & 0\\
> 0 & -1 & 0
> \end{bmatrix}.
> $$
>
> Now compute the eigenvalues of $M$.
>
> $$
> \lambda I-M
> =
> \begin{bmatrix}
> \lambda & 0 & 0\\
> 0 & \lambda & 0\\
> 0 & 0 & \lambda
> \end{bmatrix}
> -
> \begin{bmatrix}
> 0 & 0 & -\frac12\\
> \frac12 & 0 & 0\\
> 0 & -1 & 0
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \lambda I-M
> =
> \begin{bmatrix}
> \lambda & 0 & \frac12\\
> -\frac12 & \lambda & 0\\
> 0 & 1 & \lambda
> \end{bmatrix}.
> $$
>
> The determinant is
>
> $$
> \det(\lambda I-M)
> =
> \lambda^3-\frac14.
> $$
>
> So the eigenvalues satisfy
>
> $$
> \lambda^3=\frac14.
> $$
>
> Hence the magnitude of each eigenvalue satisfies
>
> $$
> |\lambda|
> =
> \sqrt[3]{\frac14}
> =
> \frac1{\sqrt[3]{4}}.
> $$
>
> Since
>
> $$
> \frac1{\sqrt[3]{4}}<1,
> $$
>
> all eigenvalues have magnitude less than $1$.
>
> Therefore,
>
> $$
> \rho(M)<1.
> $$
>
> Thus Jacobi converges.

---

# Checking Whether Gauss-Seidel Converges

> [!example] Example
> Let
>
> $$
> B=
> \begin{bmatrix}
> 2 & 0 & 2\\
> -2 & 1 & 0\\
> 0 & 1 & -1
> \end{bmatrix}.
> $$
>
> Will Gauss-Seidel converge?

> [!success]- Solution
> For Gauss-Seidel, the iteration matrix is
>
> $$
> M=I-(B-U)^{-1}B.
> $$
>
> Here
>
> $$
> U
> $$
>
> is the strictly upper triangular part of $B$:
>
> $$
> U=
> \begin{bmatrix}
> 0 & 0 & 2\\
> 0 & 0 & 0\\
> 0 & 0 & 0
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> B-U
> =
> \begin{bmatrix}
> 2 & 0 & 2\\
> -2 & 1 & 0\\
> 0 & 1 & -1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 0 & 0 & 2\\
> 0 & 0 & 0\\
> 0 & 0 & 0
> \end{bmatrix}.
> $$
>
> Thus
>
> $$
> B-U
> =
> \begin{bmatrix}
> 2 & 0 & 0\\
> -2 & 1 & 0\\
> 0 & 1 & -1
> \end{bmatrix}.
> $$
>
> We need
>
> $$
> (B-U)^{-1}.
> $$
>
> The notes compute
>
> $$
> (B-U)^{-1}
> =
> \begin{bmatrix}
> \frac12 & 0 & 0\\
> 1 & 1 & 0\\
> 1 & 1 & -1
> \end{bmatrix}.
> $$
>
> Now compute
>
> $$
> (B-U)^{-1}B
> =
> \begin{bmatrix}
> \frac12 & 0 & 0\\
> 1 & 1 & 0\\
> 1 & 1 & -1
> \end{bmatrix}
> \begin{bmatrix}
> 2 & 0 & 2\\
> -2 & 1 & 0\\
> 0 & 1 & -1
> \end{bmatrix}.
> $$
>
> Multiplying:
>
> $$
> (B-U)^{-1}B
> =
> \begin{bmatrix}
> 1 & 0 & 1\\
> 0 & 1 & 2\\
> 0 & 0 & 3
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> M
> =
> I-(B-U)^{-1}B.
> $$
>
> So
>
> $$
> M
> =
> \begin{bmatrix}
> 1 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 0 & 1
> \end{bmatrix}
> -
> \begin{bmatrix}
> 1 & 0 & 1\\
> 0 & 1 & 2\\
> 0 & 0 & 3
> \end{bmatrix}.
> $$
>
> Hence
>
> $$
> M=
> \begin{bmatrix}
> 0 & 0 & -1\\
> 0 & 0 & -2\\
> 0 & 0 & -2
> \end{bmatrix}.
> $$
>
> Since $M$ is upper triangular, its eigenvalues are on the diagonal:
>
> $$
> 0,\quad 0,\quad -2.
> $$
>
> Since
>
> $$
> |-2|=2>1,
> $$
>
> we have
>
> $$
> \rho(M)>1.
> $$
>
> Therefore, Gauss-Seidel does not converge.

---

# Jacobi vs. Gauss-Seidel

## They Do Not Always Work on the Same Matrices

> [!note] Important Note
> Jacobi and Gauss-Seidel do not work on exactly the same set of matrices.
>
> There are matrices where:
>
> - both Jacobi and Gauss-Seidel fail
> - only Jacobi fails
> - only Gauss-Seidel fails
> - both methods work

---

## When Both Work

> [!tip] Common Cases
> Both Jacobi and Gauss-Seidel work for important matrix classes such as:
>
> - diagonally dominant matrices
> - positive definite matrices

> [!warning] Speed Difference
> On matrices where both methods work, Gauss-Seidel is often faster
> sequentially.
>
> However, Jacobi is more parallelizable because all coordinates use old values
> from the previous step.

---
