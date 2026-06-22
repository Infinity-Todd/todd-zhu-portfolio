# Lecture 7 - Cholesky, Banded Matrices

> [!info] Lecture Overview
> Topics:
>
> - Cholesky factorization review
> - Row-by-row computation of the Cholesky factor
> - MATLAB-style Cholesky code
> - Flop count for Cholesky
> - Why Cholesky is cheaper than LU / PLU
> - When Cholesky can be applied
> - Banded matrices
> - Bandwidth definition
> - Complexity savings for banded matrices

---
# Recall: Cholesky Decomposition

## Key Idea

> [!note] Cholesky Factorization
> Suppose
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is symmetric positive definite.
>
> That means
>
> $$
> A=A^T,
> $$
>
> and
>
> $$
> x^TAx>0
> \qquad
> \text{for all } x\ne 0.
> $$
>
> Then $A$ has a Cholesky factorization:
>
> $$
> A=R^TR,
> $$
>
> where $R$ is upper triangular and
>
> $$
> R(i,i)>0
> \qquad
> \text{for all } i.
> $$

> [!note] Matrix Form
> The factor $R$ has the form
>
> $$
> R=
> \begin{bmatrix}
> r_{11} & r_{12} & r_{13} & \cdots & r_{1n}\\
> 0 & r_{22} & r_{23} & \cdots & r_{2n}\\
> 0 & 0 & r_{33} & \cdots & r_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & r_{nn}
> \end{bmatrix}.
> $$
>
> Therefore,
>
> $$
> R^T=
> \begin{bmatrix}
> r_{11} & 0 & 0 & \cdots & 0\\
> r_{12} & r_{22} & 0 & \cdots & 0\\
> r_{13} & r_{23} & r_{33} & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> r_{1n} & r_{2n} & r_{3n} & \cdots & r_{nn}
> \end{bmatrix}.
> $$

---

## Entrywise Formula

> [!note] Entrywise Product
> Since
>
> $$
> A=R^TR,
> $$
>
> the $(i,j)$ entry of $A$ is the dot product of the $i$th row of $R^T$ and
> the $j$th column of $R$.
>
> Equivalently, because the $i$th row of $R^T$ is the $i$th column of $R$,
>
> $$
> A(i,j)
> =
> \sum_{k=1}^{i} R(k,i)R(k,j),
> \qquad j\ge i.
> $$

> [!tip] Why the Sum Stops at $i$
> Since $R$ is upper triangular,
>
> $$
> R(k,i)=0
> \qquad
> \text{when } k>i.
> $$
>
> So only the terms
>
> $$
> k=1,2,\ldots,i
> $$
>
> can be nonzero.

---

# Row-by-Row Computation of $R$

## Main Idea

> [!note] Compute $R$ Row by Row
> The Cholesky algorithm computes $R$ row by row.
>
> When computing row $i$, all rows above it have already been computed.
>
> Therefore, the terms
>
> $$
> R(k,i)R(k,j),
> \qquad k=1,\ldots,i-1,
> $$
>
> are already known.

---

## Splitting the Entrywise Equation

> [!success]- Derivation
> Start with
>
> $$
> A(i,j)
> =
> \sum_{k=1}^{i}R(k,i)R(k,j).
> $$
>
> Split off the last term $k=i$:
>
> $$
> A(i,j)
> =
> R(i,i)R(i,j)
> +
> \sum_{k=1}^{i-1}R(k,i)R(k,j).
> $$
>
> Move the known sum to the left:
>
> $$
> A(i,j)
> -
> \sum_{k=1}^{i-1}R(k,i)R(k,j)
> =
> R(i,i)R(i,j).
> $$
>
> If $j>i$, then solve for $R(i,j)$:
>
> $$
> R(i,j)
> =
> \frac{
> A(i,j)-\sum_{k=1}^{i-1}R(k,i)R(k,j)
> }{
> R(i,i)
> }.
> $$
>
> If $j=i$, then the equation becomes
>
> $$
> A(i,i)
> =
> R(i,i)^2
> +
> \sum_{k=1}^{i-1}R(k,i)^2.
> $$
>
> Therefore,
>
> $$
> R(i,i)^2
> =
> A(i,i)
> -
> \sum_{k=1}^{i-1}R(k,i)^2.
> $$
>
> Since the Cholesky factor has positive diagonal entries,
>
> $$
> R(i,i)
> =
> \sqrt{
> A(i,i)
> -
> \sum_{k=1}^{i-1}R(k,i)^2
> }.
> $$

---

## Cholesky Formulas

> [!abstract] Off-Diagonal Formula
> For
>
> $$
> j>i,
> $$
>
> compute
>
> $$
> r_{ij}
> =
> \frac{
> a_{ij}
> -
> \sum_{k=1}^{i-1}r_{ki}r_{kj}
> }{
> r_{ii}
> }.
> $$

> [!abstract] Diagonal Formula
> For
>
> $$
> j=i,
> $$
>
> compute
>
> $$
> r_{ii}
> =
> \sqrt{
> a_{ii}
> -
> \sum_{k=1}^{i-1}r_{ki}^2
> }.
> $$

> [!warning] Positive Diagonal
> We always choose the positive square root:
>
> $$
> r_{ii}>0.
> $$

---

# MATLAB Code for Cholesky

> [!example] MATLAB Code
> The notes give the following MATLAB-style code:
>
> ```matlab
> function R = cholesky_factor(A)
>     n = size(A,1);
>     R = triu(A);    % initializes R to upper triangular part of A
>
>     for i = 1:n
>         for k = 1:(i-1)
>             R(i,i) = R(i,i) - (R(k,i))^2;
>         end
>
>         if R(i,i) <= 0
>             error('matrix is not positive definite')
>         end
>
>         R(i,i) = sqrt(R(i,i));
>
>         for j = (i+1):n
>             for k = 1:(i-1)
>                 R(i,j) = R(i,j) - R(k,i)*R(k,j);
>             end
>
>             R(i,j) = R(i,j)/R(i,i);
>         end
>     end
> end
> ```

---

## Meaning of the Code

> [!note] Initialization
> The code starts with
>
> ```matlab
> R = triu(A);
> ```
>
> This initializes $R$ to the upper triangular part of $A$.
>
> Since $R$ will be upper triangular, this means the algorithm only stores the
> part of $A$ it actually needs.

> [!note] Row-by-Row Computation
> The loop
>
> ```matlab
> for i = 1:n
> ```
>
> means the algorithm computes $R$ row by row:
>
> $$
> i=1,2,\ldots,n.
> $$

> [!note] Computing the Diagonal Entry
> The loop
>
> ```matlab
> for k = 1:(i-1)
>     R(i,i) = R(i,i) - (R(k,i))^2;
> end
> ```
>
> computes
>
> $$
> R(i,i)
> =
> A(i,i)
> -
> \sum_{k=1}^{i-1}R(k,i)^2.
> $$
>
> Then the code checks whether this value is positive:
>
> ```matlab
> if R(i,i) <= 0
>     error('matrix is not positive definite')
> end
> ```
>
> If the value is nonpositive, the matrix is not positive definite.

> [!note] Square Root Step
> The line
>
> ```matlab
> R(i,i) = sqrt(R(i,i));
> ```
>
> computes
>
> $$
> R(i,i)
> =
> \sqrt{
> A(i,i)
> -
> \sum_{k=1}^{i-1}R(k,i)^2
> }.
> $$

> [!note] Computing Off-Diagonal Entries
> For each
>
> $$
> j=i+1,\ldots,n,
> $$
>
> the code computes $R(i,j)$.
>
> The inner loop
>
> ```matlab
> for k = 1:(i-1)
>     R(i,j) = R(i,j) - R(k,i)*R(k,j);
> end
> ```
>
> subtracts
>
> $$
> \sum_{k=1}^{i-1}R(k,i)R(k,j).
> $$
>
> Then
>
> ```matlab
> R(i,j) = R(i,j)/R(i,i);
> ```
>
> divides by the diagonal entry:
>
> $$
> R(i,j)
> =
> \frac{
> A(i,j)
> -
> \sum_{k=1}^{i-1}R(k,i)R(k,j)
> }{
> R(i,i)
> }.
> $$

---

# Flop Count for Cholesky

## Cost Structure

> [!note] What Costs Flops?
> For each row $i$:
>
> - computing the diagonal entry uses about
>
> $$
> 2(i-1)+1
> $$
>
> operations
>
> - computing each off-diagonal entry $R(i,j)$, where $j>i$, also uses about
>
> $$
> 2(i-1)+1
> $$
>
> operations
>
> There are
>
> $$
> n-i
> $$
>
> off-diagonal entries to compute in row $i$.

---

## Total Cost

> [!success]- Derivation
> For row $i$, the number of computed entries is:
>
> $$
> 1+(n-i).
> $$
>
> Each of these entries costs approximately
>
> $$
> 2(i-1)+1
> $$
>
> flops.
>
> Therefore, the total cost is approximately
>
> $$
> \sum_{i=1}^{n}
> (n-i+1)\bigl(2(i-1)+1\bigr).
> $$
>
> For leading-order behavior, ignore lower-order terms:
>
> $$
> \sum_{i=1}^{n}
> (n-i+1)\bigl(2(i-1)+1\bigr)
> \sim
> \sum_{i=1}^{n}
> 2(i-1)(n-i).
> $$
>
> Expand:
>
> $$
> 2(i-1)(n-i)
> =
> 2(ni-n-i^2+i)
> =
> 2ni-2n-2i^2+2i.
> $$
>
> The leading terms come from
>
> $$
> \sum_{i=1}^{n}2ni
> -
> \sum_{i=1}^{n}2i^2.
> $$
>
> Compute:
>
> $$
> 2n\sum_{i=1}^{n}i
> -
> 2\sum_{i=1}^{n}i^2.
> $$
>
> Use
>
> $$
> \sum_{i=1}^{n}i
> =
> \frac{n(n+1)}{2},
> $$
>
> and
>
> $$
> \sum_{i=1}^{n}i^2
> =
> \frac{n(n+1)(2n+1)}{6}.
> $$
>
> Then
>
> $$
> 2n\cdot \frac{n(n+1)}{2}
> -
> 2\cdot \frac{n(n+1)(2n+1)}{6}.
> $$
>
> The leading term is
>
> $$
> n^3-\frac{2}{3}n^3
> =
> \frac13 n^3.
> $$
>
> Therefore,
>
> $$
> \boxed{
> \text{Cholesky cost}
> \sim
> \frac13 n^3
> }.
> $$

---

## Review: Cost Comparison

> [!summary] Cost Review
> LU, PLU, and Gaussian elimination plus backward substitution all cost about
>
> $$
> \frac23 n^3.
> $$
>
> Cholesky costs about
>
> $$
> \frac13 n^3.
> $$

> [!tip] Why Cholesky Is Half as Much
> Cholesky only computes one triangular factor:
>
> $$
> A=R^TR.
> $$
>
> Since $A$ is symmetric, the other half is determined automatically.
>
> Therefore, Cholesky uses about half as many flops.

> [!warning] Limitation
> This saving only applies to positive definite matrices.
>
> Cholesky is the most efficient method only when
>
> $$
> A=A^T
> $$
>
> and
>
> $$
> x^TAx>0
> \qquad
> \text{for all } x\ne 0.
> $$

---

# How Do We Know If We Can Apply Cholesky?

## Practical Check

> [!question] Question
> How do we know if we can apply Cholesky?

> [!note] Answer
> Try to run the Cholesky algorithm.
>
> If at any step the quantity inside the square root is nonpositive, then the
> matrix is not positive definite.
>
> In code, this is the check:
>
> ```matlab
> if R(i,i) <= 0
>     error('matrix is not positive definite')
> end
> ```

> [!tip] Meaning
> If the algorithm works, then $A$ is positive definite.
>
> If the algorithm fails, then $A$ is not positive definite.

---

# Banded Matrices

## Motivation

> [!note] Another Special Class of Matrices
> In applications, the types of matrices used to solve
>
> $$
> Ax=b
> $$
>
> are often special.
>
> One important special class is:
>
> $$
> \text{banded matrices}.
> $$

> [!example] Where Banded Matrices Come From
> Banded matrices often appear in discretizations of differential equations.
>
> For example, in discretizations of ODEs like
>
> $$
> y''(x)-2y'(x)+3y(x)=4,
> $$
>
> with
>
> $$
> x\in[0,1],
> \qquad
> y(0)=2,
> \qquad
> y(1)=10,
> $$
>
> the resulting matrix is often banded.

---

## Example of a Banded Matrix

> [!example] Example
> A typical banded matrix might look like
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & 0 & 0\\
> a_{21} & a_{22} & a_{23} & a_{24} & 0\\
> 0 & a_{32} & a_{33} & a_{34} & a_{35}\\
> 0 & 0 & a_{43} & a_{44} & a_{45}\\
> 0 & 0 & 0 & a_{54} & a_{55}
> \end{bmatrix}.
> $$
>
> Most entries far from the diagonal are zero.
>
> The nonzero entries live in a band around the main diagonal.

---

# Definition of Banded Matrix

> [!note] Definition: Banded Matrix
> An
>
> $$
> n\times n
> $$
>
> matrix $A$ is **banded** if there exist integers
>
> $$
> 1\le s,t\le n
> $$
>
> such that
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } j-i\ge t+1,
> $$
>
> and
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } i-j\ge s+1.
> $$

> [!note] Meaning of $t$ and $s$
> The matrix $A$ has:
>
> $$
> t
> $$
>
> nonzero upper diagonals,
>
> and
>
> $$
> s
> $$
>
> nonzero lower diagonals.
>
> The total bandwidth is
>
> $$
> t+s+1.
> $$
>
> The extra $1$ counts the main diagonal.

> [!tip] Interpretation
> The condition
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } j-i\ge t+1
> $$
>
> means entries too far above the diagonal are zero.
>
> The condition
>
> $$
> A(i,j)=0
> \qquad
> \text{for all } i-j\ge s+1
> $$
>
> means entries too far below the diagonal are zero.

---

# Complexity for Banded Matrices

## Dense Matrix Loop Structure

> [!note] Dense Matrix Algorithms
> For dense matrices, algorithms like LU, PLU, or Cholesky often have nested
> loops of the form:
>
> ```text
> for i = 1:n
>     for j = i+1:n
>         for k = ...
>             ...
>         end
>     end
> end
> ```
>
> These loops touch many entries of the matrix, giving cubic cost:
>
> $$
> O(n^3).
> $$

---

## Banded Matrix Savings

> [!abstract] Key Idea
> If $A$ is banded, then most entries are zero.
>
> We do not need to update or store entries outside the band.

> [!tip] Consequence
> Instead of looping over all
>
> $$
> j=i+1,\ldots,n,
> $$
>
> we only loop over the nearby indices inside the band.
>
> That means the amount of work per row is much smaller.

> [!summary] Main Remark
> Compared to the non-banded case, using band structure gives a huge saving.

---
