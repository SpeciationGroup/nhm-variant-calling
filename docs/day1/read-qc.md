# 1.2. Read QC

!!! abstract "Learning objectives"
    By the end of this worksheet you will be able to:

    - Run and interpret a read-quality report
    - Identify adapter contamination and low-quality bases
    - Trim reads appropriately

## TYMEK's NOTES

### Questions
- How will they be able to open the reports?
- How are PHRED QUAL scores calculated for Illumina reads?
- Is it true that modern instruments such as NovaSeq group quality scores into 4 bins? See https://www.illumina.com/content/dam/illumina-marketing/documents/products/appnotes/novaseq-hiseq-q30-app-note-770-2017-010.pdf


### Other notes
- Don't mention the wrapping, this is too much info. Supposedly FASTQ files are ralely wrapped as the @ symbol can also be a QUAL score.
- https://hbctraining.github.io/Training-modules/planning_successful_rnaseq/lessons/QC_raw_data.html
- https://www.youtube.com/watch?v=xHyclzQiay4
- https://www.youtube.com/watch?v=XdoAnsDPMfA&t=125s
- https://www.illumina.com/documents/products/technotes/technote_Q-Scores.pdf

## Sequencing-by-synthesis recap

The process of sbs is the core of Illumina technology. In its standard form, ... Currently ...

## The FASTQ format

(I will make the participants inspect an example FASTQ themselves rather then just showing it as below.)

Following the introduction of the FASTA format in the late 1980s, the FASTQ was developed at the Wellcome Trust Sanger Institute roughly a decade later. Just like FASTA, FASTQ was initally an ad hoc solution to a problem (keeping a sequence and its companion per-base quality values in sync) that, over time, atteined the status of a standard (REF). Here is a snippet of a typical FASTQ file: 

```
# zcat W_arc_03_La/W_arc_03_La_R1.fastq.gz | head -8
@SRR11570930.1 1 length=150
NGTATATTGGGGTAGTGTCTAGAGGGTATCAAACCCTCAAAGAGAATAAAGTTTCAAAGATCTACCTTAAAAACAAATGAAAAAAATGAGTCTTTCCCTTTTCTCTAATTTGACTACACTGTGACCTCGAAGTTTAATGAGGTTCAAGCA
+SRR11570930.1 1 length=150
#AAAFJJJJJJJAFFFAAFJFFJFFJF7J7<-7FFJJJ<J-7FJFFJ<--<<JFJ-FFJ7AFJ<<A-AF7FA<FJ-7-FAJ-FAF<-A-F7J<<FJJJJFJ--FF-F7FJF-JJ--FAFJ<FAFFJJFJF-<--A-7-7A7<-777-7A-
@SRR11570930.2 2 length=150
NAGAGAATGTCGCTAGTTTAGTCCATGCACGGCTCGTATAATGTAGTTGTATCGTGTTCGGTCTGGAATATTCTCGAGATTGAATATTTACTATATATTCCAGCGCTATTTCTATGTAAACAAGCTTCTATTTGAGTTCTGCTACATTGT
+SRR11570930.2 2 length=150
#A<-AJJJJJFJJ<AF<<FFFJJJ<FFF7JAJF--<JA--<--FFFJFJJF7FFJFJFFJJJJJ7--<<<-FJFJJJFF-FJF<J-F-FFF-7-AFFF-AA7AJA--7-7777J777----7<--A<FJA-A--<7AFFAF<<JJ--<FF

```
Contrasting FASTA, each FASTQ sequence entry consist of 4 rather than 2 lines (header + sequence). These are, respectively:

1. The header: a field of arbitrary length to store arbitrary information. Here, "SRR11570930" is the SRA run accession these reads were downloaded under. Note the use of @ instead of the FASTA-convention >.
2. Sequence of bases (nucleotides) - N stands for a base the instrument could not call. Note that, just like in FASTA, the sequence line can be 'wrapped', i.e. split across multiple lines.
3. Repeat of the header (optional); a + character at minimum. 
4. Phred-scaled QUAL (quality) scores. QUAL values are calculated from per-base error probabilities $P_e$ (derived from SBS colour intensities; Renaud et al. 2013) and following the formula $Q = -10 \log_{10} P_e$. In other words, $QUAL = 0$ corresponds to a completely random base (or definitely wrong?), $QUAL = 20$ corresponds to $P_e = 0.01$ (1 % chance of error), $QUAL = 30$ to $P_e = 0.001$ (0.1 % chance of error), etc. Each QUAL value sits directly below the base it scores, so the sequence and quality lines are always the same length (and can be simiarly wrapped). The scores are encoded using ASCII printable characters (see "The QUAL line" box). 

!!! tip "The QUAL line"
    The scores are encoded using ASCII characters [from 33 onwards](https://www.ascii-code.com/). Note that @ and + are used to both encode QUAL scores and to demark the 1st (header) and 3rd (repeat) lines. While using ASCII characters provide a XXX advantages over raw numbers, modern Illumina technologies such as NovaSeq take this further by binning every base call into just three Q-scores — 12, 23 and 37 (X, X and X) — plus a null score of 2 (X) for no-calls. This is made possible by XXX.
    
    Another aspect is the 'lossy' compression of FASTQ files downloaded from repositories. For example, files are made availble in the SRA-lite format. If QUAL scores are important for your analysis (as they often are...), two solutions are either (1) make sure you are downloading the original file or (2) download from the repository 

Remember that, just like FASTA, FASTQ files are essentially text files. While specialised suites of software exist (see [seqkit](https://bioinf.shenwei.me/seqkit/)), such files can be interrogated and processed using standard Unix commands such as cat (or zcat for .fastq.gz files), grep or awk. For example, the average read length can be calculated as... (or another example where you compare with seqkit).

## Quality control

While important, QUAL scores are not the only source of information regarding sequence quality, with other useful clues implicit to the sequences themselves. All these source of info can be jointly assessed using reports produced by the FastQC program (REF) developed at the Babraham Institute.

(NOW the idea is that they are talked through an example report from the toy dataset and encouraged to look at some others)

## Trimming

We use fastp because XXX. Trimmomatic is popular alternative.

## Evaluating with MultiQC

Now that we've trimmed, it's worth assessing if we actually improved the quality of our reads. For this purpose, MultiQC program. Look at the report which is similar to FastQC reports (but fancier) - do you think that read quality has improved.

## Reading list

- Cock, P.J.A., Fields, C.J., Goto, N., Heuer, M.L. & Rice, P.M. (2010).
  The Sanger FASTQ file format for sequences with quality scores, and the
  Solexa/Illumina FASTQ variants. *Nucleic Acids Research*, **38**(6), 1767–1771.
  [doi:10.1093/nar/gkp1137](https://doi.org/10.1093/nar/gkp1137)
- Renaud, G., Kircher, M., Stenzel, U. & Kelso, J. (2013).
  freeIbis: an efficient basecaller with calibrated quality scores for Illumina
  sequencers. *Bioinformatics*, **29**(9), 1208–1209.
  [doi:10.1093/bioinformatics/btt117](https://doi.org/10.1093/bioinformatics/btt117)