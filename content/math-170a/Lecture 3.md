# Lecture 3 - Gaussian Elimination, LU Factorization

> [!info] Lecture Overview
> Topics:
>
> - Gaussian elimination
> - Reducing a system to REF
> - Elementary row operations
> - Gaussian elimination algorithm
> - MATLAB code for Gaussian elimination
> - Recording multipliers
> - LU factorization
> - Conditions for LU without row swaps

---
# Last Time

> [!note] Recap
> Last time, we discussed solving a linear system in two stages:
>
> 1. Gaussian elimination
> 2. Backward substitution
>
> In Math 170A, we want to analyze backward substitution and write code for it.
>
> Today, we focus on Gaussian elimination.

---

# Gaussian Elimination Example

> [!example] Example
> Solve the system
>
> $$
> \begin{aligned}
> x+y-2z&=4,\\
> 2x+y+3z&=0,\\
> 3x-2y+2z&=-1.
> \end{aligned}
> $$
>
> In matrix form,
>
> $$
> Ax=b,
> $$
>
> where
>
> $$
> A=
> \begin{bmatrix}
> 1 & 1 & -2\\
> 2 & 1 & 3\\
> 3 & -2 & 2
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> 4\\
> 0\\
> -1
> \end{bmatrix}.
> $$

> [!success]- Solution
> Start with the augmented matrix:
>
> $$
> [A:b]
> =
> \left[
> \begin{array}{ccc|c}
> 1 & 1 & -2 & 4\\
> 2 & 1 & 3 & 0\\
> 3 & -2 & 2 & -1
> \end{array}
> \right].
> $$
>
> Use the first row as the pivot row.
>
> Eliminate the entry below the pivot in row 2:
>
> $$
> R_2-2R_1\to R_2.
> $$
>
> Compute:
>
> $$
> R_2=
> \begin{bmatrix}
> 2 & 1 & 3 & 0
> \end{bmatrix}
> -
> 2
> \begin{bmatrix}
> 1 & 1 & -2 & 4
> \end{bmatrix}.
> $$
>
> So
>
> $$
> R_2=
> \begin{bmatrix}
> 0 & -1 & 7 & -8
> \end{bmatrix}.
> $$
>
> Eliminate the entry below the pivot in row 3:
>
> $$
> R_3-3R_1\to R_3.
> $$
>
> Compute:
>
> $$
> R_3=
> \begin{bmatrix}
> 3 & -2 & 2 & -1
> \end{bmatrix}
> -
> 3
> \begin{bmatrix}
> 1 & 1 & -2 & 4
> \end{bmatrix}.
> $$
>
> So
>
> $$
> R_3=
> \begin{bmatrix}
> 0 & -5 & 8 & -13
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> \left[
> \begin{array}{ccc|c}
> 1 & 1 & -2 & 4\\
> 2 & 1 & 3 & 0\\
> 3 & -2 & 2 & -1
> \end{array}
> \right]
> \longrightarrow
> \left[
> \begin{array}{ccc|c}
> 1 & 1 & -2 & 4\\
> 0 & -1 & 7 & -8\\
> 0 & -5 & 8 & -13
> \end{array}
> \right].
> $$
>
> Now use row 2 as the pivot row.
>
> Eliminate the entry below the pivot in row 3:
>
> $$
> R_3-5R_2\to R_3.
> $$
>
> Compute:
>
> $$
> R_3=
> \begin{bmatrix}
> 0 & -5 & 8 & -13
> \end{bmatrix}
> -
> 5
> \begin{bmatrix}
> 0 & -1 & 7 & -8
> \end{bmatrix}.
> $$
>
> So
>
> $$
> R_3=
> \begin{bmatrix}
> 0 & 0 & -27 & 27
> \end{bmatrix}.
> $$
>
> Therefore, the row echelon form is
>
> $$
> \left[
> \begin{array}{ccc|c}
> 1 & 1 & -2 & 4\\
> 0 & -1 & 7 & -8\\
> 0 & 0 & -27 & 27
> \end{array}
> \right].
> $$
>
> This corresponds to the upper triangular system:
>
> $$
> x+y-2z=4,
> $$
>
> $$
> -y+7z=-8,
> $$
>
> $$
> -27z=27.
> $$
>
> Now use backward substitution.
>
> From the last equation:
>
> $$
> -27z=27.
> $$
>
> Therefore,
>
> $$
> z=-1.
> $$
>
> From the second equation:
>
> $$
> -y+7z=-8.
> $$
>
> Substitute
>
> $$
> z=-1.
> $$
>
> Then
>
> $$
> -y+7(-1)=-8.
> $$
>
> So
>
> $$
> -y-7=-8.
> $$
>
> Therefore,
>
> $$
> -y=-1,
> $$
>
> so
>
> $$
> y=1.
> $$
>
> From the first equation:
>
> $$
> x+y-2z=4.
> $$
>
> Substitute
>
> $$
> y=1,
> \qquad
> z=-1.
> $$
>
> Then
>
> $$
> x+1-2(-1)=4.
> $$
>
> So
>
> $$
> x+3=4.
> $$
>
> Therefore,
>
> $$
> x=1.
> $$
>
> Hence,
>
> $$
> \boxed{
> x=1,\qquad y=1,\qquad z=-1.
> }
> $$

---

# What Gaussian Elimination Does

> [!note] Gaussian Elimination
> Gaussian elimination performs elementary row operations on $A$ and $b$ to
> reduce $A$ to upper triangular form.
>
> The goal is to transform
>
> $$
> Ax=b
> $$
>
> into
>
> $$
> Ux=b_p,
> $$
>
> where $U$ is upper triangular.

> [!note] Upper Triangular Form
> The final matrix has the form
>
> $$
> U=
> \begin{bmatrix}
> * & * & * & \cdots & *\\
> 0 & * & * & \cdots & *\\
> 0 & 0 & * & \cdots & *\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & *
> \end{bmatrix}.
> $$

---

# Elementary Row Operations

> [!note] Row Operations
> Gaussian elimination uses elementary row operations.
>
> The main row operation used here is:
>
> $$
> R_j-\ell R_i\to R_j.
> $$
>
> This means subtract a multiple of row $i$ from row $j$.

> [!warning] Operations Not Used Here
> There are other elementary row operations:
>
> - dividing a row by a constant
> - swapping two rows
>
> But in this lecture, we do not use these two operations for Gaussian
> elimination.
>
> We only use row subtraction.

---

# General Gaussian Elimination Example

## Starting Matrix

> [!example] General $4\times 4$ Matrix
> Let
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & a_{14}\\
> a_{21} & a_{22} & a_{23} & a_{24}\\
> a_{31} & a_{32} & a_{33} & a_{34}\\
> a_{41} & a_{42} & a_{43} & a_{44}
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> b_1\\
> b_2\\
> b_3\\
> b_4
> \end{bmatrix}.
> $$

---

## First Column Elimination

> [!success]- Step 1: Eliminate Below $a_{11}$
> Use row 1 as the pivot row.
>
> For row 2, use the multiplier
>
> $$
> \ell_{21}=\frac{a_{21}}{a_{11}}.
> $$
>
> Then perform
>
> $$
> R_2-\ell_{21}R_1\to R_2.
> $$
>
> For row 3, use
>
> $$
> \ell_{31}=\frac{a_{31}}{a_{11}}.
> $$
>
> Then perform
>
> $$
> R_3-\ell_{31}R_1\to R_3.
> $$
>
> For row 4, use
>
> $$
> \ell_{41}=\frac{a_{41}}{a_{11}}.
> $$
>
> Then perform
>
> $$
> R_4-\ell_{41}R_1\to R_4.
> $$
>
> The same row operations must also be applied to $b$:
>
> $$
> b_2-\ell_{21}b_1\to \widetilde b_2,
> $$
>
> $$
> b_3-\ell_{31}b_1\to \widetilde b_3,
> $$
>
> $$
> b_4-\ell_{41}b_1\to \widetilde b_4.
> $$
>
> After this step, the matrix becomes
>
> $$
> \widetilde A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & a_{14}\\
> 0 & \widetilde a_{22} & \widetilde a_{23} & \widetilde a_{24}\\
> 0 & \widetilde a_{32} & \widetilde a_{33} & \widetilde a_{34}\\
> 0 & \widetilde a_{42} & \widetilde a_{43} & \widetilde a_{44}
> \end{bmatrix},
> \qquad
> \widetilde b=
> \begin{bmatrix}
> b_1\\
> \widetilde b_2\\
> \widetilde b_3\\
> \widetilde b_4
> \end{bmatrix}.
> $$

---

## Second Column Elimination

> [!success]- Step 2: Eliminate Below $\widetilde a_{22}$
> Now use row 2 as the pivot row.
>
> For row 3, use
>
> $$
> \ell_{32}=\frac{\widetilde a_{32}}{\widetilde a_{22}}.
> $$
>
> Then perform
>
> $$
> R_3-\ell_{32}R_2\to R_3.
> $$
>
> For row 4, use
>
> $$
> \ell_{42}=\frac{\widetilde a_{42}}{\widetilde a_{22}}.
> $$
>
> Then perform
>
> $$
> R_4-\ell_{42}R_2\to R_4.
> $$
>
> Apply the same operations to $b$:
>
> $$
> \widetilde b_3-\ell_{32}\widetilde b_2\to \overline b_3,
> $$
>
> $$
> \widetilde b_4-\ell_{42}\widetilde b_2\to \overline b_4.
> $$
>
> After this step,
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & a_{14}\\
> 0 & \widetilde a_{22} & \widetilde a_{23} & \widetilde a_{24}\\
> 0 & 0 & \overline a_{33} & \overline a_{34}\\
> 0 & 0 & \overline a_{43} & \overline a_{44}
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> b_1\\
> \widetilde b_2\\
> \overline b_3\\
> \overline b_4
> \end{bmatrix}.
> $$

---

## Third Column Elimination

> [!success]- Step 3: Eliminate Below $\overline a_{33}$
> Now use row 3 as the pivot row.
>
> For row 4, use
>
> $$
> \ell_{43}=\frac{\overline a_{43}}{\overline a_{33}}.
> $$
>
> Then perform
>
> $$
> R_4-\ell_{43}R_3\to R_4.
> $$
>
> Apply the same operation to $b$:
>
> $$
> \overline b_4-\ell_{43}\overline b_3\to b_4^*.
> $$
>
> The final upper triangular system is
>
> $$
> Ux=b_p,
> $$
>
> where
>
> $$
> U=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & a_{14}\\
> 0 & \widetilde a_{22} & \widetilde a_{23} & \widetilde a_{24}\\
> 0 & 0 & \overline a_{33} & \overline a_{34}\\
> 0 & 0 & 0 & a_{44}^*
> \end{bmatrix},
> \qquad
> b_p=
> \begin{bmatrix}
> b_1\\
> \widetilde b_2\\
> \overline b_3\\
> b_4^*
> \end{bmatrix}.
> $$
>
> Then solve
>
> $$
> Ux=b_p
> $$
>
> using backward substitution.

---

# MATLAB Code for Gaussian Elimination

## Code for Solving $Ax=b$

> [!example] MATLAB Code
> The notes write Gaussian elimination as:
>
> ```matlab
> function x = ge_solve(A,b)
>     n = length(b);
>     for i = 1:n
>         if A(i,i) == 0
>             error('cannot perform GE without row swaps')
>         end
>         for j = (i+1):n
>             l = A(j,i)/A(i,i);
>             A(j,i) = 0;
>             for k = (i+1):n
>                 A(j,k) = A(j,k) - l*A(i,k);
>             end
>             b(j) = b(j) - l*b(i);
>         end
>     end
>     U = A;
>     bp = b;
>     x = backsub(U,bp);
> end
> ```

---

## Meaning of the Code

> [!note] Outer Loop
> The outer loop
>
> ```matlab
> for i = 1:n
> ```
>
> loops over each pivot column.

> [!note] Pivot Check
> The line
>
> ```matlab
> if A(i,i) == 0
>     error('cannot perform GE without row swaps')
> end
> ```
>
> checks whether the pivot is zero.
>
> If
>
> $$
> A(i,i)=0,
> $$
>
> then this version of Gaussian elimination cannot continue without swapping
> rows.

> [!note] Multiplier
> The line
>
> ```matlab
> l = A(j,i)/A(i,i);
> ```
>
> computes the multiplier
>
> $$
> \ell_{ji}=\frac{A(j,i)}{A(i,i)}.
> $$

> [!note] Eliminate Entry
> The line
>
> ```matlab
> A(j,i) = 0;
> ```
>
> explicitly sets the eliminated entry to zero.

> [!note] Row Update
> The loop
>
> ```matlab
> for k = (i+1):n
>     A(j,k) = A(j,k) - l*A(i,k);
> end
> ```
>
> updates all entries to the right of the eliminated entry:
>
> $$
> A(j,k)\leftarrow A(j,k)-\ell_{ji}A(i,k).
> $$

> [!note] Update the Right-Hand Side
> The line
>
> ```matlab
> b(j) = b(j) - l*b(i);
> ```
>
> applies the same row operation to $b$:
>
> $$
> b_j\leftarrow b_j-\ell_{ji}b_i.
> $$

> [!note] Final Step
> After Gaussian elimination,
>
> $$
> U=A,
> \qquad
> b_p=b.
> $$
>
> Then solve
>
> $$
> Ux=b_p
> $$
>
> by backward substitution:
>
> ```matlab
> x = backsub(U,bp);
> ```

---

# Recording the Multipliers

## Why Record Multipliers?

> [!question] Question
> What if we want to record the multipliers used during Gaussian elimination?

> [!note] Multiplier Matrix
> The multipliers are
>
> $$
> \ell_{ji}
> =
> \frac{A(j,i)}{A(i,i)}
> \qquad
> \text{for } j>i.
> $$
>
> These multipliers are stored below the diagonal.

---

## Unit Lower Triangular Matrix

> [!note] Definition
> The matrix $L$ is a **unit lower triangular matrix**.
>
> This means:
>
> - entries above the diagonal are zero
> - diagonal entries are all $1$
> - entries below the diagonal store the multipliers

> [!note] Matrix Form
> For a $4\times 4$ matrix,
>
> $$
> L=
> \begin{bmatrix}
> 1 & 0 & 0 & 0\\
> \ell_{21} & 1 & 0 & 0\\
> \ell_{31} & \ell_{32} & 1 & 0\\
> \ell_{41} & \ell_{42} & \ell_{43} & 1
> \end{bmatrix}.
> $$
>
> The diagonal is all $1$ because we add the identity matrix to the multiplier
> matrix.

---

# LU Factorization

## Main Idea

> [!abstract] Proposition
> Gaussian elimination with no row swaps multiplies
>
> $$
> [A:b]
> $$
>
> by
>
> $$
> L^{-1}.
> $$
>
> In other words,
>
> $$
> L^{-1}A=U,
> $$
>
> and
>
> $$
> L^{-1}b=b_p.
> $$

> [!note] Equivalent Form
> Since
>
> $$
> L^{-1}A=U,
> $$
>
> multiply both sides by $L$:
>
> $$
> A=LU.
> $$
>
> Also, since
>
> $$
> L^{-1}b=b_p,
> $$
>
> multiply both sides by $L$:
>
> $$
> b=Lb_p.
> $$

> [!tip] Meaning
> Gaussian elimination implicitly factors
>
> $$
> A
> $$
>
> into
>
> $$
> A=LU.
> $$
>
> Here:
>
> $$
> L=
> \text{unit lower triangular},
> $$
>
> and
>
> $$
> U=
> \text{upper triangular}.
> $$

---

# MATLAB Code for LU Factorization

## Code

> [!example] MATLAB Code
> The notes rewrite the Gaussian elimination code so that it outputs $L$ and
> $U$:
>
> ```matlab
> function [L,U] = lu_factor(A)
>     n = size(A,1);
>     L = zeros(n);
>     for i = 1:n
>         if A(i,i) == 0
>             error('LU factorization does not exist')
>         end
>         for j = (i+1):n
>             L(j,i) = A(j,i)/A(i,i);
>             A(j,i) = 0;
>             for k = (i+1):n
>                 A(j,k) = A(j,k) - L(j,i)*A(i,k);
>             end
>         end
>     end
>     L = L + eye(n);
>     U = A;
> end
> ```

---

## Meaning of the Code

> [!note] Initialize $L$
> The line
>
> ```matlab
> L = zeros(n);
> ```
>
> initializes the multiplier matrix.
>
> At first,
>
> $$
> L=
> \begin{bmatrix}
> 0 & 0 & \cdots & 0\\
> 0 & 0 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & \cdots & 0
> \end{bmatrix}.
> $$

> [!note] Store Multipliers
> The line
>
> ```matlab
> L(j,i) = A(j,i)/A(i,i);
> ```
>
> stores the multiplier:
>
> $$
> \ell_{ji}=\frac{A(j,i)}{A(i,i)}.
> $$

> [!note] Add the Identity
> After the elimination process, the code does:
>
> ```matlab
> L = L + eye(n);
> ```
>
> This adds $1$ to every diagonal entry, giving a unit lower triangular matrix:
>
> $$
> L=
> \begin{bmatrix}
> 1 & 0 & \cdots & 0\\
> \ell_{21} & 1 & \cdots & 0\\
> \vdots & \vdots & \ddots & \vdots\\
> \ell_{n1} & \ell_{n2} & \cdots & 1
> \end{bmatrix}.
> $$

> [!note] Output $U$
> After elimination, the updated matrix $A$ is upper triangular.
>
> So the code sets:
>
> ```matlab
> U = A;
> ```
>
> Therefore,
>
> $$
> A_{\text{original}}=LU.
> $$

---

# Conditions for LU Without Row Swaps

## Not Every Matrix Has This LU Factorization

> [!warning] Discussion
> Not all matrices have an LU factorization without row swaps.
>
> The code above stops if a pivot is zero:
>
> $$
> A(i,i)=0.
> $$

> [!note] Necessary Conditions
> For this no-row-swap LU factorization:
>
> 1. $A$ should be invertible.
> 2. During the Gaussian elimination process, each pivot must be nonzero.

---

## Pivot Condition

> [!abstract] Condition
> The important condition is:
>
> $$
> A(i,i)\ne 0
> $$
>
> at every step of running the code.
>
> Equivalently, no row swaps are ever necessary while computing Gaussian
> elimination.

> [!warning] Important
> Even if $A$ is invertible, this no-row-swap version can fail.
>
> The issue is not only whether $A$ is invertible.
>
> The issue is whether all pivots produced during elimination are nonzero.

---
