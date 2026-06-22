# Lecture 4 - LU Factorization and Beyond

> [!info] Lecture Overview
> Topics:
>
> - MATLAB code for LU factorization
> - Complexity of LU factorization
> - Why LU is useful for multiple systems
> - Comparing Gaussian elimination vs. LU
> - When LU without row swaps exists
> - Numerical instability in floating point arithmetic
> - Why small pivots are dangerous
> - Idea of partial pivoting
> - Permutation matrices

---

# MATLAB Code for LU Factorization

## LU Factorization Code

> [!example] MATLAB Code
> Recall the MATLAB code for LU factorization:
>
> ```matlab
> function [L,U] = lu_factor(A)
>     n = size(A,1);
>     L = zeros(n);
>
>     for i = 1:n
>         if A(i,i) == 0
>             error('LU factorization does not exist')
>         end
>
>         for j = (i+1):n
>             L(j,i) = A(j,i)/A(i,i);
>             A(j,i) = 0;
>
>             for k = (i+1):n
>                 A(j,k) = A(j,k) - L(j,i)*A(i,k);
>             end
>         end
>     end
>
>     L = L + eye(n);
>     U = A;
> end
> ```

---

## Meaning of the Code

> [!note] For Each Column
> The outer loop
>
> ```matlab
> for i = 1:n
> ```
>
> means we process one pivot column at a time.

> [!note] Pivot Check
> The code checks:
>
> ```matlab
> if A(i,i) == 0
>     error('LU factorization does not exist')
> end
> ```
>
> This means LU factorization without row swaps fails if the current pivot is
> zero.

> [!note] Multiplier
> For each row below row $i$, the multiplier is
>
> $$
> L(j,i)=\frac{A(j,i)}{A(i,i)}.
> $$
>
> This is the number used to eliminate the entry
>
> $$
> A(j,i).
> $$

> [!note] Row Elimination
> The eliminated entry is set to zero:
>
> $$
> A(j,i)=0.
> $$
>
> Then for each entry to the right:
>
> $$
> A(j,k)
> =
> A(j,k)-L(j,i)A(i,k).
> $$

> [!note] Add Identity
> At the end, the code does:
>
> $$
> L=L+I.
> $$
>
> This makes $L$ unit lower triangular.

---

## Matrix Forms of $L$ and $U$

> [!note] Unit Lower Triangular $L$
> The matrix $L$ stores the multipliers below the diagonal:
>
> $$
> L=
> \begin{bmatrix}
> 1 & 0 & 0 & \cdots & 0\\
> \ell_{21} & 1 & 0 & \cdots & 0\\
> \ell_{31} & \ell_{32} & 1 & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> \ell_{n1} & \ell_{n2} & \ell_{n3} & \cdots & 1
> \end{bmatrix}.
> $$

> [!note] Upper Triangular $U$
> After Gaussian elimination, the updated $A$ becomes $U$:
>
> $$
> U=
> \begin{bmatrix}
> u_{11} & u_{12} & u_{13} & \cdots & u_{1n}\\
> 0 & u_{22} & u_{23} & \cdots & u_{2n}\\
> 0 & 0 & u_{33} & \cdots & u_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & u_{nn}
> \end{bmatrix}.
> $$

> [!abstract] LU Factorization
> If Gaussian elimination succeeds without row swaps, then
>
> $$
> A=LU.
> $$

---

# Complexity of LU Factorization

## Cost Inside the Code

> [!note] Cost for Fixed $i$ and $j$
> For fixed pivot column $i$ and row $j>i$:
>
> 1. Compute the multiplier:
>
> $$
> L(j,i)=\frac{A(j,i)}{A(i,i)}.
> $$
>
> This costs $1$ flop.
>
> 2. Update entries
>
> $$
> A(j,k)=A(j,k)-L(j,i)A(i,k),
> \qquad k=i+1,\ldots,n.
> $$
>
> Each update costs:
>
> - one multiplication
> - one subtraction
>
> So each update costs $2$ flops.
>
> Since there are
>
> $$
> n-i
> $$
>
> entries to update, this part costs
>
> $$
> 2(n-i)
> $$
>
> flops.
>
> Therefore, for fixed $i$ and $j$, the cost is
>
> $$
> 2(n-i)+1.
> $$

---

## Cost for Fixed Column $i$

> [!note] Number of Rows Below Pivot
> For a fixed pivot column $i$, the rows below it are
>
> $$
> j=i+1,i+2,\ldots,n.
> $$
>
> There are
>
> $$
> n-i
> $$
>
> such rows.
>
> Therefore, for fixed $i$, the cost is
>
> $$
> (n-i)\bigl(2(n-i)+1\bigr).
> $$

---

## Total Cost of LU

> [!success]- Derivation
> The total flop count is
>
> $$
> \sum_{i=1}^{n}(n-i)\bigl(2(n-i)+1\bigr)+n.
> $$
>
> The extra
>
> $$
> +n
> $$
>
> comes from adding the identity matrix to $L$.
>
> Let
>
> $$
> j=n-i.
> $$
>
> Then as $i$ goes from $1$ to $n$, $j$ goes from $n-1$ down to $0$.
>
> So
>
> $$
> \sum_{i=1}^{n}(n-i)\bigl(2(n-i)+1\bigr)+n
> =
> \sum_{j=0}^{n-1}j(2j+1)+n.
> $$
>
> Expand:
>
> $$
> \sum_{j=0}^{n-1}j(2j+1)+n
> =
> \sum_{j=0}^{n-1}(2j^2+j)+n.
> $$
>
> Split the sum:
>
> $$
> =
> 2\sum_{j=0}^{n-1}j^2+\sum_{j=0}^{n-1}j+n.
> $$
>
> Use the formulas:
>
> $$
> \sum_{j=1}^{N}j=\frac{N(N+1)}{2},
> $$
>
> and
>
> $$
> \sum_{j=1}^{N}j^2=\frac{N(N+1)(2N+1)}{6}.
> $$
>
> Here
>
> $$
> N=n-1.
> $$
>
> Therefore,
>
> $$
> 2\sum_{j=0}^{n-1}j^2
> =
> 2\cdot \frac{(n-1)n(2n-1)}{6}.
> $$
>
> Also,
>
> $$
> \sum_{j=0}^{n-1}j
> =
> \frac{(n-1)n}{2}.
> $$
>
> So the total cost is
>
> $$
> 2\cdot \frac{(n-1)n(2n-1)}{6}
> +
> \frac{(n-1)n}{2}
> +
> n.
> $$
>
> The leading term is
>
> $$
> \frac{2}{3}n^3.
> $$
>
> Therefore,
>
> $$
> \boxed{
> \text{LU factorization costs } \frac{2}{3}n^3+O(n^2)
> }
> $$

> [!tip] Important
> This is also the number of flops needed to perform Gaussian elimination on
>
> $$
> [A:b].
> $$

---

# Why LU?

## Solving One System

> [!note] If We Already Know $L$ and $U$
> Suppose
>
> $$
> A=LU.
> $$
>
> To solve
>
> $$
> Ax=b,
> $$
>
> write
>
> $$
> LUx=b.
> $$

> [!note] Introduce $y$
> Let
>
> $$
> y=Ux.
> $$
>
> Then the system becomes
>
> $$
> Ly=b.
> $$

> [!abstract] Two Triangular Solves
> Solve in two steps:
>
> 1. Solve
>
> $$
> Ly=b
> $$
>
> by forward substitution.
>
> 2. Solve
>
> $$
> Ux=y
> $$
>
> by backward substitution.

---

## Matrix Picture

> [!note] LU System
> The system
>
> $$
> Ax=b
> $$
>
> becomes
>
> $$
> LUx=b.
> $$
>
> Let
>
> $$
> y=Ux.
> $$
>
> Then
>
> $$
> Ly=b,
> \qquad
> Ux=y.
> $$

> [!note] Triangular Forms
> Since $L$ is lower triangular:
>
> $$
> L=
> \begin{bmatrix}
> 1 & 0 & 0 & \cdots & 0\\
> \ell_{21} & 1 & 0 & \cdots & 0\\
> \ell_{31} & \ell_{32} & 1 & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> \ell_{n1} & \ell_{n2} & \ell_{n3} & \cdots & 1
> \end{bmatrix},
> $$
>
> we solve
>
> $$
> Ly=b
> $$
>
> from top to bottom.
>
> Since $U$ is upper triangular:
>
> $$
> U=
> \begin{bmatrix}
> u_{11} & u_{12} & u_{13} & \cdots & u_{1n}\\
> 0 & u_{22} & u_{23} & \cdots & u_{2n}\\
> 0 & 0 & u_{33} & \cdots & u_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & u_{nn}
> \end{bmatrix},
> $$
>
> we solve
>
> $$
> Ux=y
> $$
>
> from bottom to top.

---

## Cost If $L$ and $U$ Are Known

> [!note] Forward and Backward Substitution Cost
> Forward substitution costs
>
> $$
> n^2
> $$
>
> flops.
>
> Backward substitution costs
>
> $$
> n^2
> $$
>
> flops.
>
> Therefore, if $L$ and $U$ are already known, solving one system costs
>
> $$
> 2n^2.
> $$

> [!tip] Why This Is Useful
> If we need to solve many systems with the same $A$:
>
> $$
> Ax=b_1,\quad Ax=b_2,\quad \ldots,\quad Ax=b_k,
> $$
>
> then we only factor $A$ once:
>
> $$
> A=LU.
> $$
>
> After that, each new right-hand side only requires two triangular solves.

---

# Comparing Costs

## Complete Solve by Gaussian Elimination

> [!note] GE + Backward Substitution
> To solve one system directly using Gaussian elimination:
>
> - Gaussian elimination:
>
> $$
> \frac{2}{3}n^3
> $$
>
> - backward substitution:
>
> $$
> n^2
> $$
>
> Total:
>
> $$
> \frac{2}{3}n^3+n^2.
> $$
>
> Since the leading term is
>
> $$
> \frac{2}{3}n^3,
> $$
>
> the total complexity is
>
> $$
> O(n^3).
> $$

---

## LU + Triangular Solves

> [!note] LU Factor Once, Solve Many Times
> LU factorization costs
>
> $$
> \frac{2}{3}n^3.
> $$
>
> For each right-hand side, forward and backward substitution cost:
>
> $$
> 2n^2.
> $$
>
> So for one solve after factorization:
>
> $$
> \frac{2}{3}n^3+2n^2.
> $$

> [!tip] Same Leading Order
> Both methods have leading cost
>
> $$
> \frac{2}{3}n^3.
> $$
>
> But LU is better when solving many systems with the same matrix $A$.

---

## Multiple Right-Hand Sides

> [!abstract] Cost Comparison
> Suppose we need to solve
>
> $$
> Ax=b_1,\quad Ax=b_2,\quad \ldots,\quad Ax=b_k.
> $$
>
> Using Gaussian elimination each time costs approximately
>
> $$
> k\left(\frac{2}{3}n^3+n^2\right).
> $$
>
> Using LU once costs approximately
>
> $$
> \frac{2}{3}n^3+2kn^2.
> $$
>
> For large $k$, LU is much cheaper.

---

# Reminder: LU Without Row Swaps

> [!warning] Reminder
> So far, we have discussed Gaussian elimination and LU only in the context of
> **no row swaps**.
>
> LU factorization without row swaps is conditional.
>
> It does not always exist.

> [!note] Necessary Conditions
> For no-row-swap LU:
>
> - $A$ should be invertible.
> - Each pivot encountered during Gaussian elimination must be nonzero.
>
> That is:
>
> $$
> A(i,i)\ne 0
> $$
>
> at every step of the algorithm.

---

# Example: Row Swaps May Be Needed

> [!example] Example
> Consider the system:
>
> $$
> \begin{aligned}
> x+y+2z&=3,\\
> 2x+2y-3z&=-1,\\
> x-y+z&=4.
> \end{aligned}
> $$
>
> The corresponding matrix is
>
> $$
> A=
> \begin{bmatrix}
> 1 & 1 & 2\\
> 2 & 2 & -3\\
> 1 & -1 & 1
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> 3\\
> -1\\
> 4
> \end{bmatrix}.
> $$

> [!success]- Solution Sketch
> Start with
>
> $$
> \left[
> \begin{array}{ccc|c}
> 1 & 1 & 2 & 3\\
> 2 & 2 & -3 & -1\\
> 1 & -1 & 1 & 4
> \end{array}
> \right].
> $$
>
> Use row 1 as the first pivot row.
>
> Eliminate row 2:
>
> $$
> R_2-2R_1\to R_2.
> $$
>
> This gives
>
> $$
> R_2=
> \begin{bmatrix}
> 0 & 0 & -7 & -7
> \end{bmatrix}.
> $$
>
> Eliminate row 3:
>
> $$
> R_3-R_1\to R_3.
> $$
>
> This gives
>
> $$
> R_3=
> \begin{bmatrix}
> 0 & -2 & -1 & 1
> \end{bmatrix}.
> $$
>
> So after the first elimination step:
>
> $$
> \left[
> \begin{array}{ccc|c}
> 1 & 1 & 2 & 3\\
> 0 & 0 & -7 & -7\\
> 0 & -2 & -1 & 1
> \end{array}
> \right].
> $$
>
> The next pivot position is
>
> $$
> A(2,2)=0.
> $$
>
> So Gaussian elimination without row swaps cannot continue.
>
> But row 3 has a nonzero entry in column 2:
>
> $$
> -2.
> $$
>
> Therefore, a row swap is needed.
>
> This means no-row-swap LU fails, even though the system may still be solvable.

---

# What Else Can Go Wrong?

## Exact Arithmetic vs. Floating Point Arithmetic

> [!question] Question
> What else can go wrong in floating point arithmetic if we only swap rows when
> the pivot is exactly zero?

> [!note] Exact Arithmetic Case
> In exact arithmetic, if the pivot is exactly zero:
>
> $$
> A(i,i)=0,
> $$
>
> then we need a row swap.
>
> If it is not zero, the algebra can continue.

> [!warning] Floating Point Arithmetic Case
> In floating point arithmetic, a pivot may be nonzero but extremely small.
>
> Then the algorithm does not swap rows, but the multiplier can become huge.
>
> This can create large numerical errors.

---

## Instability Example

> [!example] Small Pivot Example
> In exact arithmetic, we might have a matrix like:
>
> $$
> A=
> \begin{bmatrix}
> 1 & 2 & 3 & \cdots\\
> 0 & 0 & 1 & \cdots\\
> 0 & -1 & 7 & \cdots\\
> 1 & \cdots & \cdots & \cdots
> \end{bmatrix}.
> $$
>
> The second pivot is exactly zero, so we would row swap.

> [!example] Floating Point Version
> But in floating point arithmetic, the same pivot might appear as:
>
> $$
> A=
> \begin{bmatrix}
> 1 & 2 & 3 & \cdots\\
> 0 & 10^{-12} & 1+6\cdot 10^{-10} & \cdots\\
> 0 & -1+10^{-13} & 7+5\cdot 10^{-13} & \cdots\\
> \vdots & \vdots & \vdots & \ddots
> \end{bmatrix}.
> $$
>
> Now the pivot is
>
> $$
> 10^{-12},
> $$
>
> which is not zero.
>
> So the algorithm does **not** row swap.

---

## Why Small Pivots Are Bad

> [!success]- Multiplier Calculation
> The multiplier for eliminating the entry below the small pivot is roughly:
>
> $$
> \ell_{32}
> =
> \frac{-1+10^{-13}}{10^{-12}}.
> $$
>
> Since
>
> $$
> -1+10^{-13}\approx -1,
> $$
>
> we get
>
> $$
> \ell_{32}
> \approx
> \frac{-1}{10^{-12}}
> =
> -10^{12}.
> $$

> [!warning] Conclusion
> This multiplier is huge:
>
> $$
> \ell_{32}\approx -10^{12}.
> $$
>
> Huge multipliers amplify rounding errors.
>
> This makes Gaussian elimination unstable.

---

# Fix: Pivoting

## Main Fix

> [!abstract] Idea
> To avoid huge multipliers, we want to make sure the pivot is never too small.

> [!note] Partial Pivoting Rule
> At every step $i$:
>
> Start at the current pivot position
>
> $$
> A(i,i),
> $$
>
> and look down the column:
>
> $$
> \begin{bmatrix}
> A(i,i)\\
> A(i+1,i)\\
> \vdots\\
> A(n,i)
> \end{bmatrix}.
> $$
>
> Pick the entry with largest absolute value.
>
> Then swap that row into the pivot position.

> [!note] Row Swap
> If the largest absolute value is in row $p$, then swap:
>
> $$
> R_i\leftrightarrow R_p.
> $$

> [!tip] Why This Helps
> If the pivot is chosen as the largest absolute value in the column, then the
> multipliers satisfy roughly:
>
> $$
> |\ell_{ji}|\le 1.
> $$
>
> This prevents very large multipliers.

---

## What Comes Next

> [!note] Next Step
> We will do this for each
>
> $$
> i=1,2,\ldots,n-1.
> $$
>
> To keep track of the row swaps, we use a
>
> $$
> \text{permutation matrix}.
> $$
>
> This leads to
>
> $$
> PLU
> $$
>
> factorization.

---
