# Lecture 18 - Least Squares and Pseudoinverse

> [!info] Lecture Overview
> Topics:
>
> - Least squares when $A$ is not full column rank
> - Why QR does not directly work in the rank-deficient case
> - Solving least squares using SVD
> - Minimum $2$-norm least squares solution
> - Pseudoinverse
> - Full vs. reduced pseudoinverse formula

---

# Least Squares and Pseudoinverse

## Problem Setup

> [!note] Least Squares Problem
> Recall the least squares problem:
>
> $$
> \min_{x\in\mathbb{R}^n}\|b-Ax\|_2,
> $$
>
> where
>
> $$
> A\in\mathbb{R}^{m\times n},
> \qquad
> b\in\mathbb{R}^m.
> $$

> [!note] Full Rank Case
> If
>
> $$
> \operatorname{rank}(A)=n,
> $$
>
> then the least squares minimizer is unique.
>
> Using reduced QR,
>
> $$
> A=QR,
> $$
>
> the least squares solution is
>
> $$
> x=R^{-1}Q^Tb.
> $$

> [!warning] Rank-Deficient Case
> If
>
> $$
> \operatorname{rank}(A)<n,
> $$
>
> then $A$ is not full column rank.
>
> In this case:
>
> - the minimizer is not unique
> - $R$ is not invertible
> - the QR formula above does not work
> - we use SVD instead

---

# Solve Least Squares Using SVD

## Main Result

> [!abstract] Minimum Norm Least Squares Solution
> Consider
>
> $$
> \min_{x\in\mathbb{R}^n}\|b-Ax\|_2.
> $$
>
> Suppose
>
> $$
> A=U\Sigma V^T
> $$
>
> is the SVD of $A$, where
>
> $$
> U=
> \begin{bmatrix}
> | & | & & |\\
> u_1 & u_2 & \cdots & u_m\\
> | & | & & |
> \end{bmatrix},
> \qquad
> V=
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_n\\
> | & | & & |
> \end{bmatrix}.
> $$
>
> If
>
> $$
> r=\operatorname{rank}(A),
> $$
>
> then the nonzero singular values are
>
> $$
> \sigma_1,\sigma_2,\ldots,\sigma_r.
> $$
>
> The minimum $2$-norm least squares solution is
>
> $$
> x
> =
> V
> \begin{bmatrix}
> \frac{u_1^Tb}{\sigma_1}\\
> \frac{u_2^Tb}{\sigma_2}\\
> \vdots\\
> \frac{u_r^Tb}{\sigma_r}\\
> 0\\
> \vdots\\
> 0
> \end{bmatrix}.
> $$
>
> Equivalently,
>
> $$
> x=V\Sigma^+U^Tb.
> $$

> [!success]- Step-by-step Derivation
> Start with the least squares problem:
>
> $$
> \min_{x\in\mathbb{R}^n}\|b-Ax\|_2.
> $$
>
> Use the SVD:
>
> $$
> A=U\Sigma V^T.
> $$
>
> Then
>
> $$
> \|b-Ax\|_2
> =
> \|b-U\Sigma V^Tx\|_2.
> $$
>
> Since $U$ is orthogonal, multiplying by $U^T$ does not change the $2$-norm:
>
> $$
> \|b-U\Sigma V^Tx\|_2
> =
> \|U^T(b-U\Sigma V^Tx)\|_2.
> $$
>
> Distribute:
>
> $$
> =
> \|U^Tb-U^TU\Sigma V^Tx\|_2.
> $$
>
> Since
>
> $$
> U^TU=I,
> $$
>
> this becomes
>
> $$
> \|U^Tb-\Sigma V^Tx\|_2.
> $$
>
> Define
>
> $$
> y=V^Tx.
> $$
>
> Since $V$ is orthogonal,
>
> $$
> x=Vy.
> $$
>
> Therefore the problem becomes
>
> $$
> \min_y \|U^Tb-\Sigma y\|_2.
> $$
>
> Now write $U^Tb$ explicitly:
>
> $$
> U^Tb
> =
> \begin{bmatrix}
> u_1^T\\
> u_2^T\\
> \vdots\\
> u_m^T
> \end{bmatrix}
> b
> =
> \begin{bmatrix}
> u_1^Tb\\
> u_2^Tb\\
> \vdots\\
> u_m^Tb
> \end{bmatrix}.
> $$
>
> Also write
>
> $$
> y=
> \begin{bmatrix}
> y_1\\
> y_2\\
> \vdots\\
> y_n
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> r=\operatorname{rank}(A),
> $$
>
> the singular value matrix has the form
>
> $$
> \Sigma=
> \begin{bmatrix}
> \sigma_1 & 0 & \cdots & 0 & \cdots & 0\\
> 0 & \sigma_2 & \cdots & 0 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots & & \vdots\\
> 0 & 0 & \cdots & \sigma_r & \cdots & 0\\
> 0 & 0 & \cdots & 0 & \cdots & 0\\
> \vdots & \vdots & & \vdots & & \vdots\\
> 0 & 0 & \cdots & 0 & \cdots & 0
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \Sigma y
> =
> \begin{bmatrix}
> \sigma_1y_1\\
> \sigma_2y_2\\
> \vdots\\
> \sigma_ry_r\\
> 0\\
> \vdots\\
> 0
> \end{bmatrix}.
> $$
>
> So
>
> $$
> U^Tb-\Sigma y
> =
> \begin{bmatrix}
> u_1^Tb-\sigma_1y_1\\
> u_2^Tb-\sigma_2y_2\\
> \vdots\\
> u_r^Tb-\sigma_ry_r\\
> u_{r+1}^Tb\\
> \vdots\\
> u_m^Tb
> \end{bmatrix}.
> $$
>
> Hence the objective becomes
>
> $$
> \left\|
> \begin{bmatrix}
> u_1^Tb-\sigma_1y_1\\
> u_2^Tb-\sigma_2y_2\\
> \vdots\\
> u_r^Tb-\sigma_ry_r\\
> u_{r+1}^Tb\\
> \vdots\\
> u_m^Tb
> \end{bmatrix}
> \right\|_2.
> $$
>
> To minimize this norm, make the first $r$ entries equal to zero:
>
> $$
> u_i^Tb-\sigma_i y_i=0,
> \qquad i=1,\ldots,r.
> $$
>
> Therefore,
>
> $$
> \sigma_i y_i=u_i^Tb.
> $$
>
> So
>
> $$
> y_i=\frac{u_i^Tb}{\sigma_i},
> \qquad i=1,\ldots,r.
> $$
>
> Thus the first $r$ entries of $y$ are fixed:
>
> $$
> y_1=\frac{u_1^Tb}{\sigma_1},
> \qquad
> y_2=\frac{u_2^Tb}{\sigma_2},
> \qquad
> \ldots,
> \qquad
> y_r=\frac{u_r^Tb}{\sigma_r}.
> $$
>
> The remaining entries
>
> $$
> y_{r+1},\ldots,y_n
> $$
>
> are free because they do not appear in $\Sigma y$.
>
> Therefore, if
>
> $$
> \operatorname{rank}(A)<n,
> $$
>
> there are infinitely many least squares minimizers.
>
> To get the minimizer with minimum $2$-norm, choose the free entries to be zero:
>
> $$
> y_{r+1}=\cdots=y_n=0.
> $$
>
> Therefore,
>
> $$
> y=
> \begin{bmatrix}
> \frac{u_1^Tb}{\sigma_1}\\
> \frac{u_2^Tb}{\sigma_2}\\
> \vdots\\
> \frac{u_r^Tb}{\sigma_r}\\
> 0\\
> \vdots\\
> 0
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> x=Vy,
> $$
>
> we get
>
> $$
> x
> =
> V
> \begin{bmatrix}
> \frac{u_1^Tb}{\sigma_1}\\
> \frac{u_2^Tb}{\sigma_2}\\
> \vdots\\
> \frac{u_r^Tb}{\sigma_r}\\
> 0\\
> \vdots\\
> 0
> \end{bmatrix}.
> $$
>
> Equivalently,
>
> $$
> x=V\Sigma^+U^Tb.
> $$

---

# Pseudoinverse

## Definition

> [!note] Definition: Pseudoinverse
> Suppose
>
> $$
> A=U\Sigma V^T.
> $$
>
> The pseudoinverse of $A$ is defined as
>
> $$
> A^+=V\Sigma^+U^T.
> $$

---

## Explicit Form of $\Sigma^+$

> [!note] Full Matrix Form
> If
>
> $$
> \Sigma\in\mathbb{R}^{m\times n}
> $$
>
> has nonzero singular values
>
> $$
> \sigma_1,\ldots,\sigma_r,
> $$
>
> then $\Sigma$ has the form
>
> $$
> \Sigma=
> \begin{bmatrix}
> \sigma_1 & 0 & \cdots & 0 & \cdots & 0\\
> 0 & \sigma_2 & \cdots & 0 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots & & \vdots\\
> 0 & 0 & \cdots & \sigma_r & \cdots & 0\\
> 0 & 0 & \cdots & 0 & \cdots & 0\\
> \vdots & \vdots & & \vdots & & \vdots\\
> 0 & 0 & \cdots & 0 & \cdots & 0
> \end{bmatrix}.
> $$
>
> The pseudoinverse singular value matrix is
>
> $$
> \Sigma^+=
> \begin{bmatrix}
> \frac1{\sigma_1} & 0 & \cdots & 0 & \cdots & 0\\
> 0 & \frac1{\sigma_2} & \cdots & 0 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots & & \vdots\\
> 0 & 0 & \cdots & \frac1{\sigma_r} & \cdots & 0\\
> 0 & 0 & \cdots & 0 & \cdots & 0\\
> \vdots & \vdots & & \vdots & & \vdots\\
> 0 & 0 & \cdots & 0 & \cdots & 0
> \end{bmatrix}^T.
> $$
>
> The transpose is important because if
>
> $$
> \Sigma\in\mathbb{R}^{m\times n},
> $$
>
> then
>
> $$
> \Sigma^+\in\mathbb{R}^{n\times m}.
> $$


---

## Shape of the Pseudoinverse

> [!note] Shape
> If
>
> $$
> A\in\mathbb{R}^{m\times n},
> $$
>
> then
>
> $$
> A^+\in\mathbb{R}^{n\times m}.
> $$
>
> So $A^T$ and $A^+$ have the same shape.

---

# Full vs. Reduced Pseudoinverse

## Full Pseudoinverse Formula

> [!note] Full Formula
> If
>
> $$
> A=U\Sigma V^T
> $$
>
> is the full SVD, then
>
> $$
> A^+=V\Sigma^+U^T.
> $$

---

## Reduced Pseudoinverse Formula

> [!note] Reduced SVD Matrices
> If the reduced SVD is
>
> $$
> A=U_r\Sigma_rV_r^T,
> $$
>
> where
>
> $$
> U_r=
> \begin{bmatrix}
> | & | & & |\\
> u_1 & u_2 & \cdots & u_r\\
> | & | & & |
> \end{bmatrix},
> $$
>
> $$
> V_r=
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_r\\
> | & | & & |
> \end{bmatrix},
> $$
>
> and
>
> $$
> \Sigma_r=
> \begin{bmatrix}
> \sigma_1 & 0 & \cdots & 0\\
> 0 & \sigma_2 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \sigma_r
> \end{bmatrix},
> $$
>
> then
>
> $$
> \Sigma_r^{-1}
> =
> \begin{bmatrix}
> \frac1{\sigma_1} & 0 & \cdots & 0\\
> 0 & \frac1{\sigma_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \frac1{\sigma_r}
> \end{bmatrix}.
> $$

> [!success] Reduced Pseudoinverse Formula
> Therefore,
>
> $$
> A^+=V_r\Sigma_r^{-1}U_r^T.
> $$

---

# Least Squares Solution Using Pseudoinverse

## Final Formula

> [!success] Minimum Norm Least Squares Solution
> The minimum $2$-norm least squares solution is
>
> $$
> x=A^+b.
> $$

> [!note] Expanded Reduced Formula
> Since
>
> $$
> A^+=V_r\Sigma_r^{-1}U_r^T,
> $$
>
> we have
>
> $$
> x
> =
> V_r
> \begin{bmatrix}
> \frac1{\sigma_1} & 0 & \cdots & 0\\
> 0 & \frac1{\sigma_2} & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & \frac1{\sigma_r}
> \end{bmatrix}
> \begin{bmatrix}
> u_1^T\\
> u_2^T\\
> \vdots\\
> u_r^T
> \end{bmatrix}
> b.
> $$
>
> Multiplying the last two factors gives
>
> $$
> x
> =
> V_r
> \begin{bmatrix}
> \frac{u_1^Tb}{\sigma_1}\\
> \frac{u_2^Tb}{\sigma_2}\\
> \vdots\\
> \frac{u_r^Tb}{\sigma_r}
> \end{bmatrix}.
> $$
>
> Since
>
> $$
> V_r=
> \begin{bmatrix}
> | & | & & |\\
> v_1 & v_2 & \cdots & v_r\\
> | & | & & |
> \end{bmatrix},
> $$
>
> this is also
>
> $$
> x
> =
> \sum_{i=1}^r
> \frac{u_i^Tb}{\sigma_i}v_i.
> $$
