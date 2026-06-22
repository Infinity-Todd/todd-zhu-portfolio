# Lecture 10 - Condition Numbers; Perturbation Theory

> [!info] Lecture Overview
> Topics:
>
> - Condition numbers review
> - Example of condition number in infinity norm
> - Why condition numbers are at least $1$
> - Well-conditioned vs. ill-conditioned matrices
> - Perturbation theory
> - Error in the right-hand side $b$
> - Relative error bound
> - Proof of perturbation theorem
> - Error in the matrix $A$
> - When the perturbed matrix remains invertible
> - Distance to the nearest singular matrix

---

# Condition Numbers

## Definition

> [!note] Definition: Condition Number
> The condition number corresponding to an induced matrix norm
>
> $$
> \|\cdot\|:\mathbb{R}^{n\times n}\to [0,\infty)
> $$
>
> for an invertible matrix
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is
>
> $$
> \kappa_{\|\cdot\|}(A)
> =
> \|A\|\|A^{-1}\|.
> $$
>
> If the norm is the induced $p$-norm, then we write
>
> $$
> \kappa_p(A)
> =
> \|A\|_p\|A^{-1}\|_p.
> $$

---

## Meaning

> [!tip] Interpretation
> The condition number measures how much relative error can be amplified when
> solving linear systems.
>
> A matrix with a small condition number is called **well-conditioned**.
>
> A matrix with a large condition number is called **ill-conditioned**.

---

# Example: Condition Number in Infinity Norm

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & -1\\
> 0 & 2
> \end{bmatrix}.
> $$
>
> Compute
>
> $$
> \kappa_{\infty}(A).
> $$

> [!success]- Solution
> We need
>
> $$
> \kappa_{\infty}(A)
> =
> \|A\|_{\infty}\|A^{-1}\|_{\infty}.
> $$
>
> First compute
>
> $$
> \|A\|_{\infty}.
> $$
>
> The induced infinity norm is the maximum absolute row sum.
>
> For
>
> $$
> A=
> \begin{bmatrix}
> 1 & -1\\
> 0 & 2
> \end{bmatrix},
> $$
>
> the first row sum is
>
> $$
> |1|+|-1|=2.
> $$
>
> The second row sum is
>
> $$
> |0|+|2|=2.
> $$
>
> Therefore,
>
> $$
> \|A\|_{\infty}=2.
> $$
>
> Now compute $A^{-1}$.
>
> For a $2\times 2$ matrix
>
> $$
> \begin{bmatrix}
> a & b\\
> c & d
> \end{bmatrix},
> $$
>
> the inverse is
>
> $$
> \frac1{ad-bc}
> \begin{bmatrix}
> d & -b\\
> -c & a
> \end{bmatrix}.
> $$
>
> Here
>
> $$
> a=1,
> \qquad
> b=-1,
> \qquad
> c=0,
> \qquad
> d=2.
> $$
>
> Thus
>
> $$
> ad-bc=1(2)-(-1)(0)=2.
> $$
>
> Hence
>
> $$
> A^{-1}
> =
> \frac12
> \begin{bmatrix}
> 2 & 1\\
> 0 & 1
> \end{bmatrix}
> =
> \begin{bmatrix}
> 1 & \frac12\\
> 0 & \frac12
> \end{bmatrix}.
> $$
>
> Now compute
>
> $$
> \|A^{-1}\|_{\infty}.
> $$
>
> The first row sum is
>
> $$
> |1|+\left|\frac12\right|
> =
> \frac32.
> $$
>
> The second row sum is
>
> $$
> |0|+\left|\frac12\right|
> =
> \frac12.
> $$
>
> Therefore,
>
> $$
> \|A^{-1}\|_{\infty}
> =
> \frac32.
> $$
>
> So
>
> $$
> \kappa_{\infty}(A)
> =
> \|A\|_{\infty}\|A^{-1}\|_{\infty}
> =
> 2\cdot \frac32
> =
> 3.
> $$
>
> Therefore,
>
> $$
> \boxed{\kappa_{\infty}(A)=3}.
> $$

---

# Condition Number Is at Least $1$

## Proposition

> [!abstract] Proposition
> For any induced matrix norm
>
> $$
> \|\cdot\|:\mathbb{R}^{n\times n}\to [0,\infty),
> $$
>
> and for any invertible matrix
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> we have
>
> $$
> \kappa_{\|\cdot\|}(A)\ge 1.
> $$

> [!success]- Proof
> By definition,
>
> $$
> \kappa_{\|\cdot\|}(A)
> =
> \|A\|\|A^{-1}\|.
> $$
>
> Since $A$ is invertible,
>
> $$
> AA^{-1}=I.
> $$
>
> Therefore,
>
> $$
> \|A\|\|A^{-1}\|
> \ge
> \|AA^{-1}\|.
> $$
>
> This uses submultiplicativity of induced matrix norms:
>
> $$
> \|AB\|\le \|A\|\|B\|.
> $$
>
> Since
>
> $$
> AA^{-1}=I,
> $$
>
> we get
>
> $$
> \|A\|\|A^{-1}\|
> \ge
> \|I\|.
> $$
>
> For an induced matrix norm,
>
> $$
> \|I\|=1.
> $$
>
> Hence
>
> $$
> \kappa_{\|\cdot\|}(A)
> =
> \|A\|\|A^{-1}\|
> \ge 1.
> $$
>
> Therefore,
>
> $$
> \boxed{\kappa_{\|\cdot\|}(A)\ge 1}.
> $$

---

## Well-Conditioned vs. Ill-Conditioned

> [!note] Small and Large Condition Numbers
> Matrices with small condition number are called **well-conditioned**.
>
> Matrices with large condition number are called **ill-conditioned**.
>
> Since
>
> $$
> \kappa(A)\ge 1,
> $$
>
> the best possible condition number is close to $1$.

---

# Perturbation Theory

## Motivation

> [!note] Why Perturbation Theory?
> Many applications involve solving linear systems:
>
> $$
> Ax=b.
> $$
>
> However, the data used to set up the system is often noisy or faulty.
>
> Instead of having the exact
>
> $$
> A
> $$
>
> and
>
> $$
> b,
> $$
>
> we may only have noisy versions:
>
> $$
> A+\delta A,
> \qquad
> b+\delta b.
> $$

> [!tip] Main Question
> If the input data changes slightly, how much can the solution change?
>
> This is exactly what perturbation theory studies.

---

## Warning About Notation

> [!warning] Notation
> The notes use:
>
> $$
> \delta b
> $$
>
> to mean a small amount of noise in $b$.
>
> This is **not** the same as
>
> $$
> \delta \cdot b.
> $$
>
> Similarly,
>
> $$
> \delta x
> $$
>
> means the perturbation in the solution, not multiplication by a scalar.

---

# Noisy Right-Hand Side $b$

## Setup

> [!note] Setup
> Suppose we know $A$ exactly, but $b$ contains noise.
>
> The exact system is
>
> $$
> Ax=b.
> $$
>
> The noisy system is
>
> $$
> A(x+\delta x)=b+\delta b.
> $$
>
> Here:
>
> - $x$ is the exact solution
> - $x+\delta x$ is the solution to the noisy system
> - $\delta b$ is the noise in the right-hand side
> - $\delta x$ is the resulting error in the solution

---

## Theorem

> [!abstract] Perturbation Theorem: Error in $b$
> For any invertible
>
> $$
> A\in\mathbb{R}^{n\times n},
> $$
>
> any vectors
>
> $$
> b,\delta b\in\mathbb{R}^n,
> $$
>
> and any induced matrix norm
>
> $$
> \|\cdot\|:\mathbb{R}^{n\times n}\to [0,\infty)
> $$
>
> induced by a vector norm
>
> $$
> \|\cdot\|:\mathbb{R}^n\to [0,\infty),
> $$
>
> if
>
> $$
> x+\delta x
> $$
>
> is the solution to
>
> $$
> A(x+\delta x)=b+\delta b,
> $$
>
> then
>
> $$
> \boxed{
> \frac{\|\delta x\|}{\|x\|}
> \le
> \kappa_{\|\cdot\|}(A)
> \frac{\|\delta b\|}{\|b\|}
> }.
> $$

---

## Interpretation

> [!tip] Interpretation
> The theorem says:
>
> $$
> \text{relative error in the solution}
> \le
> \text{condition number of } A
> \times
> \text{relative error in } b.
> $$
>
> In formula form:
>
> $$
> \frac{\|\delta x\|}{\|x\|}
> \le
> \kappa(A)
> \frac{\|\delta b\|}{\|b\|}.
> $$

> [!warning] Meaning
> If
>
> $$
> \kappa(A)
> $$
>
> is large, then a tiny relative error in $b$ can produce a much larger relative
> error in $x$.
>
> This is why large condition number means ill-conditioned.

---

# Example: Using the Perturbation Bound

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & 0 & 1\\
> 0 & 1 & -1\\
> 1 & 1 & 1
> \end{bmatrix},
> \qquad
> A^{-1}
> =
> \begin{bmatrix}
> 0 & -1 & 1\\
> 1 & 2 & -1\\
> 1 & 1 & -1
> \end{bmatrix}.
> $$
>
> Compute
>
> $$
> \kappa_{\infty}(A).
> $$
>
> If
>
> $$
> \frac{\|\delta b\|_{\infty}}{\|b\|_{\infty}}<0.02,
> $$
>
> how large can the relative error in $x$ be?

> [!success]- Solution
> First compute
>
> $$
> \|A\|_{\infty}.
> $$
>
> The infinity norm is the maximum absolute row sum.
>
> For
>
> $$
> A=
> \begin{bmatrix}
> 1 & 0 & 1\\
> 0 & 1 & -1\\
> 1 & 1 & 1
> \end{bmatrix},
> $$
>
> the row sums are:
>
> $$
> |1|+|0|+|1|=2,
> $$
>
> $$
> |0|+|1|+|-1|=2,
> $$
>
> $$
> |1|+|1|+|1|=3.
> $$
>
> Therefore,
>
> $$
> \|A\|_{\infty}=3.
> $$
>
> Now compute
>
> $$
> \|A^{-1}\|_{\infty}.
> $$
>
> For
>
> $$
> A^{-1}
> =
> \begin{bmatrix}
> 0 & -1 & 1\\
> 1 & 2 & -1\\
> 1 & 1 & -1
> \end{bmatrix},
> $$
>
> the row sums are:
>
> $$
> |0|+|-1|+|1|=2,
> $$
>
> $$
> |1|+|2|+|-1|=4,
> $$
>
> $$
> |1|+|1|+|-1|=3.
> $$
>
> Therefore,
>
> $$
> \|A^{-1}\|_{\infty}=4.
> $$
>
> Hence
>
> $$
> \kappa_{\infty}(A)
> =
> \|A\|_{\infty}\|A^{-1}\|_{\infty}
> =
> 3\cdot 4
> =
> 12.
> $$
>
> Therefore,
>
> $$
> \boxed{\kappa_{\infty}(A)=12}.
> $$
>
> The theorem gives
>
> $$
> \frac{\|\delta x\|_{\infty}}{\|x\|_{\infty}}
> \le
> \kappa_{\infty}(A)
> \frac{\|\delta b\|_{\infty}}{\|b\|_{\infty}}.
> $$
>
> Since
>
> $$
> \kappa_{\infty}(A)=12,
> $$
>
> and
>
> $$
> \frac{\|\delta b\|_{\infty}}{\|b\|_{\infty}}<0.02,
> $$
>
> we get
>
> $$
> \frac{\|\delta x\|_{\infty}}{\|x\|_{\infty}}
> <
> 12(0.02).
> $$
>
> Therefore,
>
> $$
> \frac{\|\delta x\|_{\infty}}{\|x\|_{\infty}}
> <
> 0.24.
> $$
>
> So the relative error in the solution can be as large as about
>
> $$
> \boxed{24\%}.
> $$

---

# How to Prove the Perturbation Theorem

## Big Idea

> [!note] Proof Idea
> Start with the vector norm.
>
> Then use the induced matrix norm to bound quantities like:
>
> $$
> \|A^{-1}\delta b\|,
> \qquad
> \|Ax\|.
> $$
>
> The key reason induced norms are needed is that they allow the bound:
>
> $$
> \|Ax\|\le \|A\|\|x\|.
> $$

---

## Proof

> [!success]- Proof
> We start with the exact system:
>
> $$
> Ax=b.
> $$
>
> The noisy system is:
>
> $$
> A(x+\delta x)=b+\delta b.
> $$
>
> Subtract the exact system from the noisy system:
>
> $$
> A(x+\delta x)-Ax=(b+\delta b)-b.
> $$
>
> The left side simplifies:
>
> $$
> Ax+A\delta x-Ax=A\delta x.
> $$
>
> The right side simplifies:
>
> $$
> b+\delta b-b=\delta b.
> $$
>
> Therefore,
>
> $$
> A\delta x=\delta b.
> $$
>
> Since $A$ is invertible,
>
> $$
> \delta x=A^{-1}\delta b.
> $$
>
> Take norms:
>
> $$
> \|\delta x\|
> =
> \|A^{-1}\delta b\|.
> $$
>
> Using the induced norm inequality
>
> $$
> \|Mx\|\le \|M\|\|x\|,
> $$
>
> we get
>
> $$
> \|\delta x\|
> \le
> \|A^{-1}\|\|\delta b\|.
> $$
>
> This gives the absolute error bound:
>
> $$
> \boxed{
> \|\delta x\|
> \le
> \|A^{-1}\|\|\delta b\|
> }.
> $$
>
> Now we want a relative error bound.
>
> Absolute error alone is not very informative.
>
> For example, absolute error $0.1$ is acceptable if the true value is $1$, but
> terrible if the true value is $0.05$.
>
> So we compare to
>
> $$
> \|x\|.
> $$
>
> We need a lower bound on
>
> $$
> \|x\|.
> $$
>
> From the exact system:
>
> $$
> Ax=b.
> $$
>
> Take norms:
>
> $$
> \|Ax\|=\|b\|.
> $$
>
> By the induced norm inequality,
>
> $$
> \|Ax\|\le \|A\|\|x\|.
> $$
>
> Therefore,
>
> $$
> \|b\|\le \|A\|\|x\|.
> $$
>
> Divide by
>
> $$
> \|A\|.
> $$
>
> Then
>
> $$
> \frac{\|b\|}{\|A\|}
> \le
> \|x\|.
> $$
>
> Equivalently,
>
> $$
> \frac1{\|x\|}
> \le
> \frac{\|A\|}{\|b\|}.
> $$
>
> Now combine the absolute error bound with the lower bound on $\|x\|$:
>
> $$
> \frac{\|\delta x\|}{\|x\|}
> \le
> \|A^{-1}\|\|\delta b\|
> \cdot
> \frac{\|A\|}{\|b\|}.
> $$
>
> Rearrange:
>
> $$
> \frac{\|\delta x\|}{\|x\|}
> \le
> \|A\|\|A^{-1}\|
> \frac{\|\delta b\|}{\|b\|}.
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
> \frac{\|\delta x\|}{\|x\|}
> \le
> \kappa_{\|\cdot\|}(A)
> \frac{\|\delta b\|}{\|b\|}
> }.
> $$

---

# What If the Error Is in $A$?

## Setup

> [!note] Error in the Matrix
> Now suppose the right-hand side is exact, but the matrix has noise.
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
> is a small perturbation matrix, and
>
> $$
> \widehat{x}=x+\delta x.
> $$

> [!question] Question
> Can we even solve the perturbed system?
>
> In other words, is
>
> $$
> A+\delta A
> $$
>
> still invertible?

---

# Perturbed Matrix Invertibility

## Lemma

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

---

## Proof

> [!success]- Proof
> We prove the contrapositive.
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
> x\ne 0
> $$
>
> such that
>
> $$
> (A+\delta A)x=0.
> $$
>
> Therefore,
>
> $$
> Ax+\delta A x=0.
> $$
>
> Rearrange:
>
> $$
> Ax=-\delta A x.
> $$
>
> Multiply both sides by
>
> $$
> A^{-1}.
> $$
>
> Then
>
> $$
> x=-A^{-1}\delta A x.
> $$
>
> Take norms:
>
> $$
> \|x\|
> =
> \|-A^{-1}\delta A x\|.
> $$
>
> Since norms ignore sign,
>
> $$
> \|x\|
> =
> \|A^{-1}\delta A x\|.
> $$
>
> Apply the induced norm inequality:
>
> $$
> \|A^{-1}\delta A x\|
> \le
> \|A^{-1}\|\|\delta A\|\|x\|.
> $$
>
> Since
>
> $$
> x\ne 0,
> $$
>
> we have
>
> $$
> \|x\|>0.
> $$
>
> Divide both sides by
>
> $$
> \|x\|.
> $$
>
> We get
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
> Divide both sides by
>
> $$
> \|A\|.
> $$
>
> Then
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
> this becomes
>
> $$
> \frac1{\kappa_{\|\cdot\|}(A)}
> \le
> \frac{\|\delta A\|}{\|A\|}.
> $$
>
> Therefore, if
>
> $$
> A+\delta A
> $$
>
> is not invertible, then
>
> $$
> \frac{\|\delta A\|}{\|A\|}
> \ge
> \frac1{\kappa_{\|\cdot\|}(A)}.
> $$
>
> Taking the contrapositive:
>
> if
>
> $$
> \frac{\|\delta A\|}{\|A\|}
> <
> \frac1{\kappa_{\|\cdot\|}(A)},
> $$
>
> then
>
> $$
> A+\delta A
> $$
>
> is invertible.
>
> This proves the lemma.

---

# Distance to the Nearest Singular Matrix

## Remark

> [!note] Remark
> In addition to controlling error amplification in perturbed linear systems,
> the condition number also measures distance to the nearest singular matrix.
>
> If
>
> $$
> A
> $$
>
> is invertible, and
>
> $$
> B
> $$
>
> is not invertible, then for any induced matrix norm,
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
> \kappa(A)
> $$
>
> is large, then
>
> $$
> \frac1{\kappa(A)}
> $$
>
> is small.
>
> That means $A$ can be very close to a singular matrix.
>
> So ill-conditioned matrices are nearly singular.

> [!warning] Special Note
> The notes mention that this bound is exact for induced $2$-norms.
>
> We will see this later.

---
