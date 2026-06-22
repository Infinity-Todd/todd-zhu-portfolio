# Lecture 2 - Triangular Systems and Gaussian Elimination

> [!info] Lecture Overview
> Topics:
>
> - Solving linear systems
> - Gaussian elimination
> - Backward substitution
> - Upper triangular systems
> - General formula for backward substitution
> - MATLAB code for backward substitution
> - Flop count / complexity
> - Forward substitution

---

# Solving Linear Systems

## Main Goal

> [!note] Solving Linear Systems
> A large part of this quarter is about learning different algorithms for
> solving linear systems:
>
> $$
> Ax=b.
> $$
>
> In Math 18, one common method was to use the augmented matrix
>
> $$
> [A:b]
> $$
>
> and row-reduce it to REF or RREF.

---

## General Strategy

> [!note] Two-Step Process
> Suppose
>
> $$
> A\in\mathbb{R}^{n\times n}
> $$
>
> is invertible, meaning full rank.
>
> Solving
>
> $$
> Ax=b
> $$
>
> can be viewed as a two-step process.

> [!abstract] Step 1: Gaussian Elimination
> Start with the augmented matrix
>
> $$
> [A:b].
> $$
>
> Use Gaussian elimination to reduce the matrix to triangular form:
>
> $$
> [A:b]
> \longrightarrow
> [U:c],
> $$
>
> where
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
>
> This step makes the system upper triangular.

> [!abstract] Step 2: Backward Substitution
> Once we have an upper triangular system
>
> $$
> Ux=c,
> $$
>
> we solve it from the bottom equation upward.
>
> This is called **backward substitution**.

---

## Math 18 vs. Math 170A

> [!note] Difference from Math 18
> In Math 18, we often performed RREF on
>
> $$
> [A:b].
> $$
>
> That gives a reduced row echelon form directly.

> [!note] Math 170A Perspective
> In Math 170A, we separate the process into:
>
> - Gaussian elimination
> - backward substitution
>
> The goal is to analyze and code each step efficiently.

---

# Why Do We Care About Efficiency?

## Motivation

> [!note] Purpose
> In Math 18, we did many things using RREF, such as:
>
> - solving linear systems
> - finding inverses
> - analyzing rank
>
> In Math 170A, we ask:
>
> How can we do this efficiently?

> [!question] Main Computational Question
> Suppose we need to solve
>
> $$
> Ax=b
> $$
>
> for many different right-hand sides:
>
> $$
> b_1,b_2,\ldots,b_k,
> $$
>
> where $k$ is large.
>
> The matrix $A$ is the same for all systems.

> [!tip] Key Idea
> We want to preprocess
>
> $$
> A
> $$
>
> so that each solve becomes cheap.
>
> This motivates algorithms like Gaussian elimination and LU factorization.

---

# Backward Substitution

## Example System

> [!example] Example: Upper Triangular System
> Solve the system:
>
> $$
> \begin{aligned}
> w+2z+y-x&=-1,\\
> 3z+y+x&=-2,\\
> y+4x&=4,\\
> 2x&=2.
> \end{aligned}
> $$

> [!note] Matrix Form
> In the variable order
>
> $$
> \begin{bmatrix}
> w\\
> z\\
> y\\
> x
> \end{bmatrix},
> $$
>
> the system can be written as
>
> $$
> A
> \begin{bmatrix}
> w\\
> z\\
> y\\
> x
> \end{bmatrix}
> =
> b,
> $$
>
> where
>
> $$
> A=
> \begin{bmatrix}
> 1 & 2 & 1 & -1\\
> 0 & 3 & 1 & 1\\
> 0 & 0 & 1 & 4\\
> 0 & 0 & 0 & 2
> \end{bmatrix},
> \qquad
> b=
> \begin{bmatrix}
> -1\\
> -2\\
> 4\\
> 2
> \end{bmatrix}.
> $$

> [!success]- Solution
> Since the system is upper triangular, solve from the bottom equation upward.
>
> Start with the last equation:
>
> $$
> 2x=2.
> $$
>
> Therefore,
>
> $$
> x=1.
> $$
>
> Now use the third equation:
>
> $$
> y+4x=4.
> $$
>
> Substitute
>
> $$
> x=1.
> $$
>
> Then
>
> $$
> y+4(1)=4.
> $$
>
> So
>
> $$
> y+4=4.
> $$
>
> Therefore,
>
> $$
> y=0.
> $$
>
> Now use the second equation:
>
> $$
> 3z+y+x=-2.
> $$
>
> Substitute
>
> $$
> y=0,
> \qquad
> x=1.
> $$
>
> Then
>
> $$
> 3z+0+1=-2.
> $$
>
> So
>
> $$
> 3z=-3.
> $$
>
> Therefore,
>
> $$
> z=-1.
> $$
>
> Finally, use the first equation:
>
> $$
> w+2z+y-x=-1.
> $$
>
> Substitute
>
> $$
> z=-1,
> \qquad
> y=0,
> \qquad
> x=1.
> $$
>
> Then
>
> $$
> w+2(-1)+0-1=-1.
> $$
>
> So
>
> $$
> w-2-1=-1.
> $$
>
> Hence
>
> $$
> w-3=-1.
> $$
>
> Therefore,
>
> $$
> w=2.
> $$
>
> So the solution is
>
> $$
> \boxed{
> \begin{bmatrix}
> w\\
> z\\
> y\\
> x
> \end{bmatrix}
> =
> \begin{bmatrix}
> 2\\
> -1\\
> 0\\
> 1
> \end{bmatrix}
> }.
> $$

---

# General Upper Triangular System

## General Form

> [!note] General Upper Triangular System
> An upper triangular system has the form
>
> $$
> \begin{aligned}
> a_{11}x_1+a_{12}x_2+\cdots+a_{1,n-1}x_{n-1}+a_{1n}x_n&=b_1,\\
> a_{22}x_2+\cdots+a_{2,n-1}x_{n-1}+a_{2n}x_n&=b_2,\\
> &\vdots\\
> a_{n-1,n-1}x_{n-1}+a_{n-1,n}x_n&=b_{n-1},\\
> a_{nn}x_n&=b_n.
> \end{aligned}
> $$

> [!note] Matrix Form
> The matrix has zeros below the diagonal:
>
> $$
> A=
> \begin{bmatrix}
> a_{11} & a_{12} & a_{13} & \cdots & a_{1n}\\
> 0 & a_{22} & a_{23} & \cdots & a_{2n}\\
> 0 & 0 & a_{33} & \cdots & a_{3n}\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & a_{nn}
> \end{bmatrix}.
> $$

---

## Backward Substitution Idea

> [!note] Backward Order
> Backward substitution solves variables in this order:
>
> $$
> x_n,\ x_{n-1},\ x_{n-2},\ldots,x_2,\ x_1.
> $$

> [!tip] Why This Works
> The last equation only contains
>
> $$
> x_n.
> $$
>
> After solving for $x_n$, substitute it into the equation above to solve for
>
> $$
> x_{n-1}.
> $$
>
> Continue upward until reaching
>
> $$
> x_1.
> $$

---

## Formula for Backward Substitution

> [!abstract] Formula
> For
>
> $$
> i=n,n-1,n-2,\ldots,1,
> $$
>
> the backward substitution formula is
>
> $$
> x_i
> =
> \frac{
> b_i-\sum_{j=i+1}^n a_{ij}x_j
> }{
> a_{ii}
> }.
> $$

> [!success]- Derivation
> Consider row $i$ of the upper triangular system.
>
> Since entries below the diagonal are zero, row $i$ is:
>
> $$
> a_{ii}x_i+a_{i,i+1}x_{i+1}+a_{i,i+2}x_{i+2}
> +\cdots+a_{in}x_n=b_i.
> $$
>
> Move the known terms to the right side:
>
> $$
> a_{ii}x_i
> =
> b_i-a_{i,i+1}x_{i+1}-a_{i,i+2}x_{i+2}
> -\cdots-a_{in}x_n.
> $$
>
> In summation form:
>
> $$
> a_{ii}x_i
> =
> b_i-\sum_{j=i+1}^n a_{ij}x_j.
> $$
>
> Divide by
>
> $$
> a_{ii}.
> $$
>
> Therefore,
>
> $$
> x_i
> =
> \frac{
> b_i-\sum_{j=i+1}^n a_{ij}x_j
> }{
> a_{ii}
> }.
> $$

> [!warning] Requirement
> We need
>
> $$
> a_{ii}\ne 0
> $$
>
> for every diagonal entry.
>
> Otherwise, the division step is not valid.

---

# MATLAB Code for Backward Substitution

## Code

> [!example] MATLAB Code
> The notes give the following MATLAB-style code:
>
> ```matlab
> function x = backsub(A,b)
>     n = size(b,1);
>     x = b;
>     for i = n:-1:1
>         for j = (i+1):n
>             x(i) = x(i) - A(i,j)*x(j);
>         end
>         if A(i,i) == 0
>             error('matrix is singular')
>         end
>         x(i) = x(i)/A(i,i);
>     end
> end
> ```

---

## Meaning of the Code

> [!note] Initialization
> The line
>
> ```matlab
> n = size(b,1);
> ```
>
> stores the number of unknowns.
>
> The line
>
> ```matlab
> x = b;
> ```
>
> initializes $x$ as a copy of $b$.
>
> As the algorithm runs, entries of $x$ are overwritten with the solution.

> [!note] Outer Loop
> The loop
>
> ```matlab
> for i = n:-1:1
> ```
>
> means we compute:
>
> $$
> x_n,\ x_{n-1},\ldots,x_1.
> $$

> [!note] Inner Loop
> The loop
>
> ```matlab
> for j = (i+1):n
> ```
>
> subtracts the known terms:
>
> $$
> A(i,j)x(j).
> $$
>
> This corresponds to the summation:
>
> $$
> \sum_{j=i+1}^n a_{ij}x_j.
> $$

> [!note] Singularity Check
> The line
>
> ```matlab
> if A(i,i) == 0
>     error('matrix is singular')
> end
> ```
>
> checks whether division by zero would occur.
>
> If
>
> $$
> A(i,i)=0,
> $$
>
> then the triangular system cannot be solved using this formula.

> [!note] Division Step
> The line
>
> ```matlab
> x(i) = x(i)/A(i,i);
> ```
>
> performs:
>
> $$
> x_i
> =
> \frac{
> b_i-\sum_{j=i+1}^n a_{ij}x_j
> }{
> a_{ii}
> }.
> $$

---

# Flop Count for Backward Substitution

## Cost for a Fixed Row

> [!note] Fixed Row Cost
> For a fixed row
>
> $$
> i,
> $$
>
> the inner loop runs over
>
> $$
> j=i+1,i+2,\ldots,n.
> $$
>
> So there are
>
> $$
> n-i
> $$
>
> terms.
>
> Each term
>
> $$
> A(i,j)x(j)
> $$
>
> costs:
>
> - one multiplication
> - one subtraction
>
> So each term costs about
>
> $$
> 2
> $$
>
> flops.
>
> After the inner loop, the division
>
> $$
> x(i)=x(i)/A(i,i)
> $$
>
> costs
>
> $$
> 1
> $$
>
> flop.
>
> Therefore, for fixed $i$, the cost is
>
> $$
> 2(n-i)+1.
> $$

---

## Total Flop Count

> [!success]- Derivation
> The total number of flops is
>
> $$
> \sum_{i=1}^{n}\left(2(n-i)+1\right).
> $$
>
> Let
>
> $$
> j=n-i.
> $$
>
> As
>
> $$
> i=1,2,\ldots,n,
> $$
>
> the value of $j$ runs from
>
> $$
> n-1,n-2,\ldots,0.
> $$
>
> Therefore,
>
> $$
> \sum_{i=1}^{n}\left(2(n-i)+1\right)
> =
> \sum_{j=0}^{n-1}(2j+1).
> $$
>
> Split the sum:
>
> $$
> \sum_{j=0}^{n-1}(2j+1)
> =
> 2\sum_{j=0}^{n-1}j+\sum_{j=0}^{n-1}1.
> $$
>
> Now
>
> $$
> \sum_{j=0}^{n-1}1=n.
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
> Therefore,
>
> $$
> 2\sum_{j=0}^{n-1}j+\sum_{j=0}^{n-1}1
> =
> 2\cdot \frac{(n-1)n}{2}+n.
> $$
>
> This becomes
>
> $$
> (n-1)n+n.
> $$
>
> So
>
> $$
> (n-1)n+n=n^2.
> $$
>
> Therefore, backward substitution takes
>
> $$
> \boxed{n^2}
> $$
>
> flops for a general
>
> $$
> n\times n
> $$
>
> triangular system.

> [!tip] Complexity
> The complexity is
>
> $$
> O(n^2).
> $$

---

# Forward Substitution

## Lower Triangular Systems

> [!note] Forward Substitution
> Forward substitution is the same idea as backward substitution, but for a
> lower triangular system.
>
> Instead of an upper triangular matrix like
>
> $$
> \begin{bmatrix}
> * & * & * & \cdots & *\\
> 0 & * & * & \cdots & *\\
> 0 & 0 & * & \cdots & *\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> 0 & 0 & 0 & \cdots & *
> \end{bmatrix},
> $$
>
> we have a lower triangular matrix:
>
> $$
> \begin{bmatrix}
> * & 0 & 0 & \cdots & 0\\
> * & * & 0 & \cdots & 0\\
> * & * & * & \cdots & 0\\
> \vdots & \vdots & \vdots & \ddots & \vdots\\
> * & * & * & \cdots & *
> \end{bmatrix}.
> $$

---

## Forward Substitution Formula

> [!abstract] Formula
> For a lower triangular system
>
> $$
> Lx=b,
> $$
>
> solve from top to bottom:
>
> $$
> i=1,2,\ldots,n.
> $$
>
> The formula is
>
> $$
> x_i
> =
> \frac{
> b_i-\sum_{j=1}^{i-1}l_{ij}x_j
> }{
> l_{ii}
> }.
> $$

> [!tip] Complexity
> Forward substitution has the same flop count as backward substitution:
>
> $$
> n^2.
> $$
>
> Therefore,
>
> $$
> \text{complexity}=O(n^2).
> $$
