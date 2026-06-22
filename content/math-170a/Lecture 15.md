# Lecture 15 - Full QR and Least Squares

> [!info] Lecture Overview
> Topics:
>
> - Least squares problems
> - Solving least squares using QR decomposition
> - Rank-deficient least squares

---
# Least Squares

## Setup

> [!note] Least Squares Setup
> Let
>
> $$
> A \in \mathbb{R}^{m\times n},
> \qquad
> b\in \mathbb{R}^m,
> \qquad
> m\ge n.
> $$
>
> We want to solve
>
> $$
> Ax=b.
> $$

> [!warning] Overdetermined System
> If
>
> $$
> m>n,
> $$
>
> then the system is usually overdetermined.
>
> In general, there may be no exact solution.

---

## Least Squares Problem

> [!note] Definition: Least Squares Problem
> If $Ax=b$ cannot be solved exactly, we look for the closest possible solution:
>
> $$
> x
> =
> \arg\min_{x\in\mathbb{R}^n}
> \|b-Ax\|_2.
> $$

> [!tip] Intuition
> The vector
>
> $$
> b-Ax
> $$
>
> is called the **residual**.
>
> Least squares chooses $x$ to minimize the size of the residual.

---

## Residual

> [!note] Definition: Residual
> For a candidate solution $x$, the residual is
>
> $$
> r = b-Ax.
> $$
>
> The least squares problem tries to make
>
> $$
> \|r\|_2 = \|b-Ax\|_2
> $$
>
> as small as possible.

> [!tip] Geometric Interpretation
> We are trying to find a vector $Ax$ in the column space of $A$ that is
> closest to $b$.
>
> That means we are projecting $b$ onto
>
> $$
> \operatorname{Col}(A).
> $$

---

## Full Rank Least Squares

> [!abstract] Theorem: Uniqueness
> If
>
> $$
> \operatorname{rank}(A)=n,
> $$
>
> then the columns of $A$ are linearly independent.
>
> In this case, the least squares minimization problem has a **unique**
> solution.

> [!abstract] Theorem
> If $\operatorname{rank}(A)=n$, the reduced/economic QR decomposition is
>
> $$
> A = QR,
> \qquad
> Q \in \mathbb{R}^{m \times n},
> \qquad
> Q^TQ = I_n
> $$
>
> where $R$ is upper triangular with positive diagonal entries.
> This decomposition is **unique**.

---

# Least Squares Example

## Data Fitting

> [!example] Data Fitting Problem
> Suppose we are given data points
>
> $$
> \{(x_i,y_i)\}_{i=1}^k.
> $$
>
> We want to fit a function
>
> $$
> y_i \approx f(x_i).
> $$
>
> For example, for a line:
>
> $$
> y_i \approx mx_i+b.
> $$

> [!tip] Why Least Squares Appears
> In real data, the points usually do not lie exactly on a single line.
>
> So we cannot solve the equations exactly.
>
> Instead, we find the line that best approximates the data in the least
> squares sense.

![[Least square example.png]]

---

# Solving Least Squares with Full QR

## Recall

> [!note] Recall
> Multiplication by an orthogonal matrix preserves vector $2$-norm.
>
> If
>
> $$
> Q\in\mathbb{R}^{m\times m}
> $$
>
> is orthogonal, then
>
> $$
> \|Qx\|_2 = \|x\|_2
> $$
>
> for every
>
> $$
> x\in\mathbb{R}^m.
> $$

> [!tip] Why This Matters
> Since orthogonal matrices preserve norm, we can transform the least squares
> objective without changing its value.
>
> This lets us use QR decomposition to solve least squares problems.

## Full QR Setup

> [!note] Full QR Setup
> Let the full QR decomposition be
>
> $$
> A = Q_{\text{full}}
> \begin{bmatrix}
> R \\
> 0
> \end{bmatrix}.
> $$
>
> Also write
>
> $$
> Q_{\text{full}}
> =
> [Q_{\text{red}} \;\; \widetilde Q].
> $$

> [!tip] Shapes
> If
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> then
>
> $$
> Q_{\text{full}}\in\mathbb{R}^{m\times m},
> $$
>
> $$
> Q_{\text{red}}\in\mathbb{R}^{m\times n},
> $$
>
> $$
> R\in\mathbb{R}^{n\times n}.
> $$

## What We Want to Minimize

> [!note] What We Want to Minimize
> For the least squares problem, we want to minimize the residual:
>
> $$
> \|b-Ax\|_2.
> $$
>
> Using the full QR decomposition,
>
> $$
> A
> =
> Q_{\text{full}}
> \begin{bmatrix}
> R\\
> 0
> \end{bmatrix},
> $$
>
> where $Q_{\text{full}}$ is orthogonal.

> [!success]- Step-by-step Derivation
> Start with the residual:
>
> $$
> \|b-Ax\|_2.
> $$
>
> Since $Q_{\text{full}}$ is orthogonal,
>
> $$
> \|b-Ax\|_2
> =
> \|Q_{\text{full}}^T(b-Ax)\|_2.
> $$
>
> Now distribute $Q_{\text{full}}^T$:
>
> $$
> Q_{\text{full}}^T(b-Ax)
> =
> Q_{\text{full}}^Tb
> -
> Q_{\text{full}}^TAx.
> $$
>
> Since
>
> $$
> A
> =
> Q_{\text{full}}
> \begin{bmatrix}
> R\\
> 0
> \end{bmatrix},
> $$
>
> we have
>
> $$
> Q_{\text{full}}^TA
> =
> Q_{\text{full}}^TQ_{\text{full}}
> \begin{bmatrix}
> R\\
> 0
> \end{bmatrix}.
> $$
>
> Because $Q_{\text{full}}$ is orthogonal,
>
> $$
> Q_{\text{full}}^TQ_{\text{full}}=I.
> $$
>
> Therefore,
>
> $$
> Q_{\text{full}}^TA
> =
> \begin{bmatrix}
> R\\
> 0
> \end{bmatrix}.
> $$
>
> So
>
> $$
> Q_{\text{full}}^T(b-Ax)
> =
> Q_{\text{full}}^Tb
> -
> \begin{bmatrix}
> R\\
> 0
> \end{bmatrix}x.
> $$
>
> Now split $Q_{\text{full}}$ into reduced QR columns and remaining columns:
>
> $$
> Q_{\text{full}}
> =
> [Q_{\text{red}} \ \widetilde Q].
> $$
>
> Then
>
> $$
> Q_{\text{full}}^Tb
> =
> \begin{bmatrix}
> Q_{\text{red}}^Tb\\
> \widetilde Q^Tb
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> Q_{\text{full}}^T(b-Ax)
> =
> \begin{bmatrix}
> Q_{\text{red}}^Tb\\
> \widetilde Q^Tb
> \end{bmatrix}
> -
> \begin{bmatrix}
> Rx\\
> 0
> \end{bmatrix}.
> $$
>
> Hence,
>
> $$
> Q_{\text{full}}^T(b-Ax)
> =
> \begin{bmatrix}
> Q_{\text{red}}^Tb - Rx\\
> \widetilde Q^Tb
> \end{bmatrix}.
> $$
>
> So the objective becomes
>
> $$
> \|b-Ax\|_2
> =
> \left\|
> \begin{bmatrix}
> Q_{\text{red}}^Tb - Rx\\
> \widetilde Q^Tb
> \end{bmatrix}
> \right\|_2.
> $$
>
> The second part,
>
> $$
> \widetilde Q^Tb,
> $$
>
> does not depend on $x$.
>
> Therefore, minimizing the whole expression boils down to minimizing
>
> $$
> \|Q_{\text{red}}^Tb - Rx\|_2.
> $$
>
> The smallest possible value is obtained when
>
> $$
> Q_{\text{red}}^Tb - Rx = 0.
> $$
>
> So
>
> $$
> Rx = Q_{\text{red}}^Tb.
> $$
>
> If $A$ has full column rank, then $R$ is invertible, so the least squares
> solution is
>
> $$
> x = R^{-1}Q_{\text{red}}^Tb.
> $$
>
>Therefore, The minimal value of $\|b-Ax\|_2$ is 
>$$
>\|\widetilde Q^Tb\|_2.
>$$



