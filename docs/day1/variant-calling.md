# 1.4. Variant calling

> Calling SNPs and indels from your alignments to produce a raw VCF.

!!! abstract "Learning objectives"
    By the end of this session you will be able to:

    - Call SNPs and indels from BAM files to produce a raw VCF
    - Compare the main variant callers at a high level
    - Read the anatomy of a VCF file

## Calling variants

Choose a caller (we'll focus on one, but the concepts transfer):

=== "bcftools"
    <!-- TODO: bcftools mpileup | bcftools call -->

=== "GATK"
    <!-- TODO: HaplotypeCaller -->

=== "FreeBayes"
    <!-- TODO: freebayes command -->

## The VCF format

<!-- TODO: anatomy of a VCF (header, INFO, FORMAT, genotypes). -->

The output is a **raw, unfiltered VCF** — the starting point for Day 2.

## Exercise

<!-- TODO -->
