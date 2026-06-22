# Lecture 5 - Partial Pivoting, Permutations, PLU

> [!info] Lecture Overview
> Topics:
>
> - Why ordinary LU is unstable
> - Partial pivoting
> - Row swaps
> - Permutations
> - Permutation matrices
> - What left multiplication by $P$ does
> - PLU factorization
> - MATLAB-style code for PLU
> - Why LU / PLU is useful for many right-hand sides
> - LU vs. PLU summary

---

# Recap: LU Factorization

> [!note] LU Exists Only Sometimes
> Some matrices have LU factorizations without row swaps.
>
> For no-row-swap LU, we need:
>
> - $A$ is invertible
> - no division by zero during the algorithm
> - no pivot $A(i,i)$ is zero when we need to divide by it

> [!warning] Computational Issue
> Even if LU exists, ordinary LU without pivoting can be unstable.
>
> It cannot really be trusted as a large-matrix algorithm.
>
> The problem is that Gaussian elimination can create very large entries in
> $L$.

> [!note] Why Large Entries in $L$ Are Bad
> The entries of $L$ are the multipliers:
>
> $$
> L(j,i)=\frac{A(j,i)}{A(i,i)}.
> $$
>
> If the pivot
>
> $$
> A(i,i)
> $$
>
> is very small, then
>
> $$
> L(j,i)
> $$
>
> can become very large.
>
> Large multipliers can create large accumulated rounding error.

---

# Fix: Partial Pivoting

## Main Idea

> [!abstract] Partial Pivoting
> The goal of partial pivoting is to make sure the multipliers
>
> $$
> L(j,i)
> $$
>
> are never too large.
>
> At every step, we choose the largest available entry in the current column
> and move it into the pivot position.

> [!note] Step-by-Step Rule
> At step $i$:
>
> Start at the current pivot position
>
> $$
> A(i,i),
> $$
>
> and look downward in the same column:
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
> Pick the entry with largest absolute value:
>
> $$
> |A(i^*,i)|
> =
> \max_{j=i,\ldots,n}|A(j,i)|.
> $$
>
> Then swap row $i^*$ with row $i$:
>
> $$
> R_{i^*}\leftrightarrow R_i.
> $$

> [!tip] Why This Helps
> After the row swap, the pivot
>
> $$
> A(i,i)
> $$
>
> is the largest entry in its partial column in absolute value.
>
> Therefore, for all rows $j>i$,
>
> $$
> |A(j,i)|\le |A(i,i)|.
> $$
>
> So the multiplier satisfies
>
> $$
> |L(j,i)|
> =
> \left|
> \frac{A(j,i)}{A(i,i)}
> \right|
> \le 1.
> $$
>
> This prevents huge multipliers.

---

## Why It Is Cheap

> [!note] Cost
> Partial pivoting is surprisingly easy and cheap.
>
> At each step, we only search down one column:
>
> $$
> A(i,i),A(i+1,i),\ldots,A(n,i).
> $$
>
> Then we swap two rows.
>
> This is much cheaper than the main Gaussian elimination work.

---

# Permutations

## Definition

> [!note] Definition: Permutation
> A permutation $p$ is a bijective function
>
> $$
> p:\{1,2,\ldots,n\}\to \{1,2,\ldots,n\}.
> $$
>
> Bijective means:
>
> - one-to-one
> - onto

> [!example] Example
> For
>
> $$
> n=3,
> $$
>
> one possible permutation is
>
> $$
> p(1)=3,
> \qquad
> p(2)=1,
> \qquad
> p(3)=2.
> $$
>
> This means:
>
> $$
> 1\mapsto 3,
> \qquad
> 2\mapsto 1,
> \qquad
> 3\mapsto 2.
> $$

---

# Permutation Matrices

## Definition

> [!note] Definition: Permutation Matrix
> An
>
> $$
> n\times n
> $$
>
> permutation matrix is a matrix with entries only $0$ and $1$, given by a
> permutation $p$.
>
> The only nonzero entry in row $i$ is
>
> $$
> P(i,p(i)).
> $$
>
> In other words,
>
> $$
> P(i,p(i))=1
> $$
>
> for every row $i$.

> [!example] Example
> For the permutation
>
> $$
> p(1)=3,
> \qquad
> p(2)=1,
> \qquad
> p(3)=2,
> $$
>
> the permutation matrix is
>
> $$
> P=
> \begin{bmatrix}
> 0 & 0 & 1\\
> 1 & 0 & 0\\
> 0 & 1 & 0
> \end{bmatrix}.
> $$
>
> Row $1$ has its $1$ in column $3$.
>
> Row $2$ has its $1$ in column $1$.
>
> Row $3$ has its $1$ in column $2$.

---

## Getting $P$ from the Identity

> [!note] Identity Matrix
> Start with
>
> $$
> I_3=
> \begin{bmatrix}
> 1 & 0 & 0\\
> 0 & 1 & 0\\
> 0 & 0 & 1
> \end{bmatrix}.
> $$
>
> To get
>
> $$
> P=
> \begin{bmatrix}
> 0 & 0 & 1\\
> 1 & 0 & 0\\
> 0 & 1 & 0
> \end{bmatrix},
> $$
>
> permute the rows according to $p$:
>
> $$
> R_1\gets R_3,
> \qquad
> R_2\gets R_1,
> \qquad
> R_3\gets R_2.
> $$

> [!tip] Remark
> A permutation matrix can be obtained from the identity matrix by permuting
> rows.

---

# What Multiplying by $P$ Does

## Left Multiplication

> [!abstract] Key Fact
> Multiplying a permutation matrix $P$ on the left of a matrix $A$ permutes the
> rows of $A$ according to $p$.

> [!example] Example
> Let
>
> $$
> A=
> \begin{bmatrix}
> 1 & 2 & 3\\
> 4 & 5 & 6\\
> 7 & 8 & 9
> \end{bmatrix}.
> $$
>
> Using
>
> $$
> P=
> \begin{bmatrix}
> 0 & 0 & 1\\
> 1 & 0 & 0\\
> 0 & 1 & 0
> \end{bmatrix},
> $$
>
> compute
>
> $$
> PA
> =
> \begin{bmatrix}
> 0 & 0 & 1\\
> 1 & 0 & 0\\
> 0 & 1 & 0
> \end{bmatrix}
> \begin{bmatrix}
> 1 & 2 & 3\\
> 4 & 5 & 6\\
> 7 & 8 & 9
> \end{bmatrix}.
> $$
>
> The result is
>
> $$
> PA=
> \begin{bmatrix}
> 7 & 8 & 9\\
> 1 & 2 & 3\\
> 4 & 5 & 6
> \end{bmatrix}.
> $$
>
> So the rows have been rearranged:
>
> $$
> R_1\gets R_3,
> \qquad
> R_2\gets R_1,
> \qquad
> R_3\gets R_2.
> $$

---

## Left vs. Right Multiplication

> [!warning] Important
> Multiplying by $P$ on the left permutes rows:
>
> $$
> PA
> =
> \text{row-permuted }A.
> $$
>
> Multiplying by $P$ on the right permutes columns:
>
> $$
> AP
> =
> \text{column-permuted }A.
> $$

> [!tip] In This Lecture
> For partial pivoting, we care about row swaps.
>
> Therefore, we use
>
> $$
> PA.
> $$

---

# PLU Factorization

## Stable Variant of LU

> [!abstract] PLU Factorization
> A stable variant of LU is **PLU factorization**, also called LU with partial
> pivoting.
>
> It produces three matrices:
>
> $$
> P,\ L,\ U
> $$
>
> such that
>
> $$
> LU=PA.
> $$

> [!note] Matrix Types
> In PLU factorization:
>
> $$
> P
> $$
>
> is a permutation matrix,
>
> $$
> L
> $$
>
> is unit lower triangular, with
>
> $$
> |L(j,i)|\le 1
> \qquad
> \text{for } j>i,
> $$
>
> and
>
> $$
> U
> $$
>
> is upper triangular.

> [!note] Matrix Forms
> The matrices look like:
>
> $$
> P=
> \begin{bmatrix}
> 0 & 0 & 1\\
> 1 & 0 & 0\\
> 0 & 1 & 0
> \end{bmatrix},
> $$
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
> and
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

---

## Why PLU Is Stable

> [!tip] Main Reason
> Partial pivoting chooses the largest absolute entry in the current column as
> the pivot.
>
> Therefore, the multipliers satisfy
>
> $$
> |L(j,i)|\le 1.
> $$
>
> This avoids the huge multipliers that caused instability in ordinary LU.

---

# MATLAB Code for PLU Factorization

> [!example] MATLAB Code
> The notes modify the LU code to include partial pivoting:
>
> ```matlab
> function [L,U,P] = plu_factor(A)
>     n = size(A,1);
>     P = eye(n);
>     L = zeros(n);
>
>     for i = 1:n
>         [v, i_star] = max(abs(A(i:n,i)));
>         i_star = i_star + i - 1;
>
>         if i_star ~= i
>             tempA = A(i,:);
>             A(i,:) = A(i_star,:);
>             A(i_star,:) = tempA;
>
>             tempP = P(i,:);
>             P(i,:) = P(i_star,:);
>             P(i_star,:) = tempP;
>
>             tempL = L(i,:);
>             L(i,:) = L(i_star,:);
>             L(i_star,:) = tempL;
>         end
>
>         for j = (i+1):n
>             L(j,i) = A(j,i)/A(i,i);
>             A(j,i) = 0;
>
>             for k = (i+1):n
>                 A(j,k) = A(j,k)-L(j,i)*A(i,k);
>             end
>         end
>     end
>
>     U = A;
>     L = L + eye(n);
> end
> ```

---

## Meaning of the PLU Code

> [!note] Initialize $P$ and $L$
> The code starts with
>
> ```matlab
> P = eye(n);
> L = zeros(n);
> ```
>
> This means:
>
> $$
> P=I_n,
> $$
>
> and $L$ initially contains no multipliers.

> [!note] Find Largest Pivot Candidate
> The line
>
> ```matlab
> [v, i_star] = max(abs(A(i:n,i)));
> ```
>
> looks down the current column:
>
> $$
> A(i,i),A(i+1,i),\ldots,A(n,i),
> $$
>
> and finds the entry with largest absolute value.
>
> The index is then adjusted by:
>
> ```matlab
> i_star = i_star + i - 1;
> ```
>
> because MATLAB searched only inside the smaller vector
>
> $$
> A(i:n,i).
> $$

> [!example] Index Example
> Suppose
>
> $$
> n=8,
> \qquad
> i=3.
> $$
>
> We search inside
>
> $$
> A(3:8,3).
> $$
>
> If MATLAB returns
>
> $$
> i_\text{star}=5
> $$
>
> inside this shortened vector, then the true row index is
>
> $$
> 5+3-1=7.
> $$
>
> So the real pivot row is row $7$.

> [!note] Swap Rows in $A$
> If
>
> $$
> i^*\ne i,
> $$
>
> the code swaps rows $i$ and $i^*$ of $A$:
>
> ```matlab
> tempA = A(i,:);
> A(i,:) = A(i_star,:);
> A(i_star,:) = tempA;
> ```

> [!note] Swap Rows in $P$
> The code also swaps rows of $P$:
>
> ```matlab
> tempP = P(i,:);
> P(i,:) = P(i_star,:);
> P(i_star,:) = tempP;
> ```
>
> This records the row swaps.

> [!note] Swap Rows in $L$
> The code also swaps rows of $L$:
>
> ```matlab
> tempL = L(i,:);
> L(i,:) = L(i_star,:);
> L(i_star,:) = tempL;
> ```
>
> This keeps the already-recorded multipliers consistent with the row swaps.

> [!warning] Important
> When pivoting after some elimination steps, we must also swap the relevant
> stored multiplier rows in $L$.
>
> Otherwise, the final relation
>
> $$
> LU=PA
> $$
>
> will not be correct.

> [!note] Elimination Step
> After swapping, the code performs ordinary Gaussian elimination:
>
> $$
> L(j,i)=\frac{A(j,i)}{A(i,i)},
> $$
>
> $$
> A(j,i)=0,
> $$
>
> and
>
> $$
> A(j,k)=A(j,k)-L(j,i)A(i,k).
> $$

> [!note] Final Output
> At the end:
>
> $$
> U=A,
> $$
>
> and
>
> $$
> L=L+I.
> $$
>
> Therefore, the output satisfies
>
> $$
> LU=PA.
> $$

---

# Flop Count

> [!note] Cost of PLU
> The flop count for PLU is still approximately
>
> $$
> \frac23 n^3.
> $$
>
> Searching for pivots and swapping rows adds lower-order cost.
>
> Therefore,
>
> $$
> \text{PLU factorization cost}
> \sim
> \frac23 n^3.
> $$

---

# Solving $Ax=b$ Using PLU

## Given $L,U,P$

> [!note] Setup
> Suppose we have
>
> $$
> LU=PA.
> $$
>
> We want to solve
>
> $$
> Ax=b.
> $$

> [!success]- Derivation
> Start with
>
> $$
> Ax=b.
> $$
>
> Multiply both sides by $P$:
>
> $$
> PAx=Pb.
> $$
>
> Since
>
> $$
> PA=LU,
> $$
>
> this becomes
>
> $$
> LUx=Pb.
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
> Ly=Pb.
> $$
>
> So solve in two triangular steps:
>
> $$
> Ly=Pb
> $$
>
> by forward substitution, and then
>
> $$
> Ux=y
> $$
>
> by backward substitution.

> [!abstract] PLU Solve
> To solve
>
> $$
> Ax=b
> $$
>
> using
>
> $$
> LU=PA,
> $$
>
> do:
>
> $$
> Ly=Pb,
> $$
>
> then
>
> $$
> Ux=y.
> $$

---

# Why LU and PLU Are Useful

> [!note] Many Right-Hand Sides
> In practice, we often need to solve
>
> $$
> Ax=b_1,\quad Ax=b_2,\quad \ldots,\quad Ax=b_k
> $$
>
> for many different right-hand sides.

> [!warning] Expensive Approach
> If we solve each system separately using Gaussian elimination and backward
> substitution, then we repeat the expensive work every time.

> [!tip] Better Approach
> Instead, do one factorization:
>
> $$
> LU=PA.
> $$
>
> Once
>
> $$
> L,\ U,\ P
> $$
>
> are known, each new solve only requires:
>
> $$
> Ly=Pb_i,
> $$
>
> then
>
> $$
> Ux=y.
> $$

> [!note] Cost
> The factorization costs about
>
> $$
> \frac23 n^3.
> $$
>
> Each solve after that costs about
>
> $$
> 2n^2.
> $$
>
> This is much better for many right-hand sides.

---

# Final Recall

> [!summary] LU
> LU without pivoting:
>
> - exists only for some invertible matrices
> - can be unstable
> - may create large multipliers
>
> Symbolically:
>
> $$
> A=LU.
> $$

> [!summary] PLU
> PLU with partial pivoting:
>
> - exists for all invertible matrices
> - is stable in practice
> - keeps multipliers controlled:
>
> $$
> |L(j,i)|\le 1
> $$
>
> Symbolically:
>
> $$
> LU=PA.
> $$

---
