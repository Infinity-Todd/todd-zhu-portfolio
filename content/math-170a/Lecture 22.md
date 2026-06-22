# Lecture 22 - Power Method, Hessenberg, QR Iteration

> [!info] Lecture Overview
> Topics:
>
> - Recall power method
> - MATLAB implementation of power method
> - Example of power method
> - Constraints and convergence of power method
> - Computing more than one eigenvalue at a time
> - Hessenberg form
> - QR iteration
> - Why Hessenberg form is needed
> - Complexity of QR iteration

---

# Recall: Power Method

## Setup

> [!note] Power Method Assumptions
> Let
>
> $$
> A\in\mathbb{C}^{n\times n}
> $$
>
> or
>
> $$
> A\in\mathbb{R}^{n\times n}.
> $$
>
> For simplicity, assume $A$ is semisimple and its eigenvalues satisfy
>
> $$
> |\lambda_1|>|\lambda_2|\ge |\lambda_3|\ge \cdots \ge |\lambda_n|.
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
> The power method computes the dominant eigenpair:
>
> $$
> (\lambda_1,v_1).
> $$
>
> Here $\lambda_1$ is the eigenvalue with largest absolute value.

## Basic Idea

> [!note] Power Method Idea
> Start with a vector $q$ in general position.
>
> This means $q$ has a nonzero component in the direction of $v_1$.
>
> Then repeatedly multiply by $A$:
>
> $$
> q,\quad Aq,\quad A^2q,\quad A^3q,\quad \ldots
> $$
>
> After each multiplication, normalize the vector.

> [!warning] Why Normalize?
> Without normalization, the vector may grow very large or shrink very small.
>
> Normalization keeps the vector from jumping around too much in magnitude.

## Convergence Factor

> [!note] Convergence Rate
> The smaller the ratio
>
> $$
> \left|\frac{\lambda_2}{\lambda_1}\right|,
> $$
>
> the faster the convergence.
>
> More generally, the convergence factor is
>
> $$
> \max_{j\ge 2}\left|\frac{\lambda_j}{\lambda_1}\right|.
> $$

---

# MATLAB Code for Power Method

## Code

> [!example] MATLAB Code
> The notes write the power method in MATLAB style:
>
> ```matlab
> function [vec, lambda] = power_method(A, q, iter)
>     q_new = q;
>     [v, ind] = max(abs(q_new));
>     s = q_new(ind(1));
>     q_old = q_new / s;
>
>     for i = 1:iter
>         q_new = A * q_old;
>         [v, ind] = max(abs(q_new));
>         s = q_new(ind(1));
>         q_old = q_new / s;
>     end
>
>     vec = q_old;
>     lambda = s;
> end
> ```

---

## Meaning of the Code

> [!note] Initialization
> The line
>
> ```matlab
> q_new = q;
> ```
>
> starts with the initial vector $q$.

> [!note] Find the Largest Entry
> The line
>
> ```matlab
> [v, ind] = max(abs(q_new));
> ```
>
> finds the index where $q_{\text{new}}$ has the largest absolute value.

> [!note] Scaling Factor
> The line
>
> ```matlab
> s = q_new(ind(1));
> ```
>
> stores the entry of largest magnitude.
>
> This scalar $s$ is used to normalize the vector.

> [!note] Normalize
> The line
>
> ```matlab
> q_old = q_new / s;
> ```
>
> divides the vector by the largest-magnitude entry.
>
> This makes the largest entry have magnitude $1$.

> [!note] Iteration Step
> Inside the loop,
>
> ```matlab
> q_new = A * q_old;
> ```
>
> multiplies the current vector by $A$.
>
> Then the code rescales the vector again.

## Flip Count

> [!note] Flop Count
> Each iteration requires one matrix-vector multiplication:
>
> $$
> q_{\text{new}}=Aq_{\text{old}}.
> $$
>
> For an $n\times n$ matrix, this costs about
>
> $$
> 2n^2
> $$
>
> flops.
>
> The normalization costs about
>
> $$
> n
> $$
>
> more flops.
>
> Therefore, each iteration costs about
>
> $$
> 2n^2+n
> $$
>
> flops.

> [!note] Total Cost
> If we run the method for
>
> $$
> \text{iter}
> $$
>
> iterations, then the total cost is
>
> $$
> n+\text{iter}(2n^2+n).
> $$
>
> So the overall complexity is
>
> $$
> O(n^2\cdot \#\text{iterations}).
> $$

---

# Example: Power Method

## Matrix

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 3 & 1\\
> 1 & 1
> \end{bmatrix}.
> $$
>
> We use the power method to approximate the dominant eigenvalue and
> eigenvector.

## Exact Eigenvalues

> [!success]- Exact Eigenvalue Computation
> First compute the characteristic polynomial:
>
> $$
> \det(\lambda I-A)
> =
> \det
> \left(
> \begin{bmatrix}
> \lambda & 0\\
> 0 & \lambda
> \end{bmatrix}
> -
> \begin{bmatrix}
> 3 & 1\\
> 1 & 1
> \end{bmatrix}
> \right).
> $$
>
> So
>
> $$
> \lambda I-A
> =
> \begin{bmatrix}
> \lambda-3 & -1\\
> -1 & \lambda-1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \det(\lambda I-A)
> =
> \det
> \begin{bmatrix}
> \lambda-3 & -1\\
> -1 & \lambda-1
> \end{bmatrix}.
> $$
>
> For a $2\times 2$ matrix,
>
> $$
> \det
> \begin{bmatrix}
> a & b\\
> c & d
> \end{bmatrix}
> =
> ad-bc.
> $$
>
> Thus
>
> $$
> \det(\lambda I-A)
> =
> (\lambda-3)(\lambda-1)-(-1)(-1).
> $$
>
> Hence
>
> $$
> \det(\lambda I-A)
> =
> \lambda^2-4\lambda+3-1
> =
> \lambda^2-4\lambda+2.
> $$
>
> Solve
>
> $$
> \lambda^2-4\lambda+2=0.
> $$
>
> Using the quadratic formula,
>
> $$
> \lambda
> =
> \frac{4\pm\sqrt{16-8}}{2}
> =
> \frac{4\pm\sqrt8}{2}
> =
> 2\pm\sqrt2.
> $$
>
> Therefore,
>
> $$
> \lambda_1=2+\sqrt2\approx 3.4142,
> $$
>
> and
>
> $$
> \lambda_2=2-\sqrt2\approx 0.5858.
> $$

## Exact Dominant Eigenvector

> [!success]- Eigenvector for $\lambda_1=2+\sqrt2$
> Solve
>
> $$
> (\lambda_1 I-A)v=0.
> $$
>
> Since
>
> $$
> \lambda_1=2+\sqrt2,
> $$
>
> we have
>
> $$
> \lambda_1 I-A
> =
> \begin{bmatrix}
> 2+\sqrt2 & 0\\
> 0 & 2+\sqrt2
> \end{bmatrix}
> -
> \begin{bmatrix}
> 3 & 1\\
> 1 & 1
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \lambda_1 I-A
> =
> \begin{bmatrix}
> -1+\sqrt2 & -1\\
> -1 & 1+\sqrt2
> \end{bmatrix}.
> $$
>
> Solve
>
> $$
> \begin{bmatrix}
> -1+\sqrt2 & -1\\
> -1 & 1+\sqrt2
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
> From the first row,
>
> $$
> (-1+\sqrt2)v_1-v_2=0.
> $$
>
> Hence
>
> $$
> v_2=(-1+\sqrt2)v_1.
> $$
>
> Choose
>
> $$
> v_1=1.
> $$
>
> Then
>
> $$
> v_2=\sqrt2-1\approx 0.4142.
> $$
>
> So an eigenvector is
>
> $$
> v=
> \begin{bmatrix}
> 1\\
> \sqrt2-1
> \end{bmatrix}
> \approx
> \begin{bmatrix}
> 1\\
> 0.4142
> \end{bmatrix}.
> $$

## Approximation of Eigenvector

> [!success]- Power Method Iterations
> Start with
>
> $$
> q_0=
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}.
> $$
>
> Multiply:
>
> $$
> Aq_0
> =
> \begin{bmatrix}
> 3 & 1\\
> 1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> 4\\
> 2
> \end{bmatrix}.
> $$
>
> Normalize by the largest entry:
>
> $$
> s=4.
> $$
>
> Therefore,
>
> $$
> q_1=
> \frac1{4}
> \begin{bmatrix}
> 4\\
> 2
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> \frac12
> \end{bmatrix}.
> $$
>
> Multiply again:
>
> $$
> Aq_1
> =
> \begin{bmatrix}
> 3 & 1\\
> 1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> \frac12
> \end{bmatrix}
> =
> \begin{bmatrix}
> \frac72\\
> \frac32
> \end{bmatrix}.
> $$
>
> Normalize by the largest entry:
>
> $$
> s=\frac72=3.5.
> $$
>
> Then
>
> $$
> q_2=
> \frac{1}{7/2}
> \begin{bmatrix}
> \frac72\\
> \frac32
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> \frac37
> \end{bmatrix}
> \approx
> \begin{bmatrix}
> 1\\
> 0.4286
> \end{bmatrix}.
> $$
>
> Multiply again:
>
> $$
> Aq_2
> =
> \begin{bmatrix}
> 3 & 1\\
> 1 & 1
> \end{bmatrix}
> \begin{bmatrix}
> 1\\
> \frac37
> \end{bmatrix}
> =
> \begin{bmatrix}
> \frac{24}{7}\\
> \frac{10}{7}
> \end{bmatrix}.
> $$
>
> Normalize by the largest entry:
>
> $$
> s=\frac{24}{7}\approx 3.4286.
> $$
>
> Therefore,
>
> $$
> q_3=
> \frac{1}{24/7}
> \begin{bmatrix}
> \frac{24}{7}\\
> \frac{10}{7}
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1\\
> \frac{5}{12}
> \end{bmatrix}
> \approx
> \begin{bmatrix}
> 1\\
> 0.4167
> \end{bmatrix}.
> $$
>
> This is getting close to
>
> $$
> \begin{bmatrix}
> 1\\
> 0.4142
> \end{bmatrix}.
> $$

---

## Constraints of Power Method

> [!warning] Constraints
> The power method requires:
>
> $$
> |\lambda_1|>|\lambda_2|\ge \cdots \ge |\lambda_n|.
> $$
>
> The smaller
>
> $$
> \left|\frac{\lambda_2}{\lambda_1}\right|,
> $$
>
> the faster the convergence.
>
> In this example,
>
> $$
> \left|\frac{\lambda_2}{\lambda_1}\right|
> =
> \frac{2-\sqrt2}{2+\sqrt2}
> \approx 0.17.
> $$
>
> So the convergence is fast.

> [!warning] Starting Vector
> The starting vector $q$ should be random or in general position.
>
> This ensures that the projection of $q$ onto $v_1$ is not zero.

> [!note] Semisimple Assumption
> The assumption that $A$ is semisimple is not actually necessary for the power
> method, but it makes the explanation easier.

---

# Computing More Than One Eigenvalue at a Time

## Motivation

> [!note] Idea
> The power method computes one eigenvalue at a time.
>
> Now we want to compute more than one eigenvalue at a time.
>
> Ideally, we want to compute the whole Schur factorization:
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
> and
>
> $$
> T
> $$
>
> is upper triangular.

> [!warning] Reality
> Abel-Ruffini says we cannot directly compute eigenvalues exactly in general.
>
> So instead, we try an iterative method.

---

# QR Iteration Overview

## Two Stages

> [!note] Two-Stage Strategy
> To compute eigenvalues, we use two stages.
>
> **Stage 1:** Directly compute Hessenberg form.
>
> **Stage 2:** Use QR iteration on the Hessenberg matrix.

---

# Stage 1: Hessenberg Form

## Hessenberg Matrix

> [!note] Definition: Hessenberg Matrix
> A matrix $H$ is called upper Hessenberg if it is zero below the first
> subdiagonal.
>
> It has the form
>
> $$
> H=
> \begin{bmatrix}
> h_{11} & h_{12} & h_{13} & \cdots & h_{1n}\\
> h_{21} & h_{22} & h_{23} & \cdots & h_{2n}\\
> 0 & h_{32} & h_{33} & \cdots & h_{3n}\\
> 0 & 0 & h_{43} & \cdots & h_{4n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & h_{n,n-1} & h_{nn}
> \end{bmatrix}.
> $$
>
> So $H$ is almost upper triangular, but it has one extra lower diagonal.

---

## Computing Hessenberg Form

> [!note] Hessenberg Reduction
> We first compute
>
> $$
> A=UHU^*,
> $$
>
> where
>
> $$
> U^*U=UU^*=I,
> $$
>
> and $H$ is Hessenberg.
>
> Equivalently,
>
> $$
> H=U^*AU.
> $$
>
> This means $A$ and $H$ are similar, so they have the same eigenvalues.

> [!tip] How It Is Computed
> Hessenberg form can be computed using Householder reflections.
>
> The cost is about
>
> $$
> \frac{10}{3}n^3
> $$
>
> flops.
>
> In MATLAB:
>
> ```matlab
> H = hess(A);
> ```

---

# Stage 2: QR Iteration

## Basic QR Iteration

> [!note] QR Iteration
> Start with
>
> $$
> H_0=H.
> $$
>
> For
>
> $$
> i=1,2,\ldots,k,
> $$
>
> compute the QR factorization:
>
> $$
> H_{i-1}=Q_iR_i.
> $$
>
> Then reverse the product:
>
> $$
> H_i=R_iQ_i.
> $$

> [!note] Matrix Form of One Step
> Since
>
> $$
> H_{i-1}=Q_iR_i,
> $$
>
> we have
>
> $$
> R_i=Q_i^*H_{i-1}.
> $$
>
> Therefore,
>
> $$
> H_i=R_iQ_i
> =
> Q_i^*H_{i-1}Q_i.
> $$
>
> So
>
> $$
> H_i
> $$
>
> is similar to
>
> $$
> H_{i-1}.
> $$
>
> Therefore, every $H_i$ has the same eigenvalues as $A$.

---

## Why QR Iteration Works

> [!tip] Main Idea
> QR iteration performs something like the power method simultaneously for all
> eigenvalues.
>
> Under good conditions,
>
> $$
> H_i
> $$
>
> gets closer and closer to upper triangular form.
>
> The eigenvalues then appear on the diagonal.

---

## QR Iteration Pseudocode

> [!example] QR Iteration
> The notes write the algorithm as:
>
> ```matlab
> H0 = H;
>
> for i = 1:k
>     [Q, R] = qr(H{i-1});
>     H{i} = R * Q;
> end
> ```
>
> More mathematically:
>
> $$
> H_0=H,
> $$
>
> and for $i=1,\ldots,k$:
>
> $$
> H_{i-1}=Q_iR_i,
> $$
>
> $$
> H_i=R_iQ_i.
> $$

---

# Complexity

## Stage 1 Cost

> [!note] Stage 1
> Computing Hessenberg form costs about
>
> $$
> \frac{10}{3}n^3
> $$
>
> flops.
>
> This is done once.

---

## Stage 2 Cost

> [!note] Stage 2
> QR iteration on a Hessenberg matrix costs about
>
> $$
> O(n^2)
> $$
>
> per iteration.
>
> This is because all the matrices remain Hessenberg.

> [!tip] Total Cost
> If we run
>
> $$
> k
> $$
>
> iterations, then the total cost is
>
> $$
> \frac{10}{3}n^3+O(kn^2).
> $$

---

## Why Stage 1 Is Needed

> [!warning] Why We Need Hessenberg First
> Without Stage 1, each QR iteration on a full dense matrix would cost
>
> $$
> O(n^3).
> $$
>
> So $k$ iterations would cost
>
> $$
> O(kn^3).
> $$
>
> With Hessenberg form, the total cost becomes
>
> $$
> \frac{10}{3}n^3+O(kn^2).
> $$
>
> Therefore, the upfront Hessenberg reduction makes QR iteration much cheaper.

---
