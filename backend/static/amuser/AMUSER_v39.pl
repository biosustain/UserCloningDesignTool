#!/usr/bin/perl
use strict;
use Getopt::Long;

my $version = "1.0";

open (OUTFRED, '>', "/usr/opt/www/pub/CBS/services/AMUSER-1.0/tmp/hejFred.txt");

###################################################################
#      	                 AMUSER version 1                         #
#																  #
#                   main program developed by:					  #
#				 Lars Ronn Olsen (lro@binf.ku.dk) 				  #
#																  #
#			 subroutines for input handling developed by:		  #
#			   Jakob Berg Jespersen (jbeje@bio.dtu.dk)			  #
#																  #
#				    html interface developed by:				  #
#			 Frederik Otzen Bagger (frederik@binf.ku.dk)		  #
#																  #
#						web server set up by:					  #
#			    Rasmus Wernersson (raz@intomics.com)			  #
#																  #
#                first version written: 15.12.2011                #
#                     latest update: 17.12.2013                   #
###################################################################


###################################################################
#####                       MAIN PROGRAM                      #####
###################################################################


#First, input/output files and other parameters are defined:

# -i = input file name (if eq "+" then file will be piped)
# -r = report file name (if eq "+" then file will be piped)
# -o = fasta output file name (if eq "+" then file will be piped)
# -h = html output file name
# -workdir = subdirectory path for saving outputfiles (accepts only [DIRNAME], dir is created if non-existent)
# -baseurl = URL for the individual batch report files
# -cstandard = choice of standard cassette (name of cassette)
# -cmaninfor = cassette forward strand from manual input
# -cmaninrev = cassette reverse strand from manual input
# -cnick = choice of nicking site (name of enzyme)
# -crestr = choice of restriction site (name of enzyme)
# -db1 = directional bases 1
# -db2 = directional bases 2
# -cname = cassette name
# -tm = Tm optimization (numeric value 30-90 or "eq")
# -sc = NA+ concentration (defaults to 50 mM)
# -pc = primer concentration (defaults to 50 nM)
# -ci = circular input if "-ci y"
# -co = circular output if "-co y"
# -verbose = verbose messages for debugging if "-verbose y"



my @fastaoutarray;		#array of fastaoutputs
my @fastabatcharray;	#array of fastaoutputs as printed for batch assembly
my @outreportarray;		#array of report output
my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);
$year = $year + 1900;
$mon++;
$mon = sprintf ("%02d", $mon);
$mday = sprintf ("%02d", $mday);
$min = sprintf ("%02d", $min);
$hour = sprintf ("%02d", $hour);
$sec = sprintf ("%02d", $sec);



###################################################################
#assigning cmd line options


my %options;
GetOptions("i=s"=>\$options{i},
	   "r=s"=>\$options{r},
	   "o=s"=>\$options{o},
	   "h=s"=>\$options{h},
	   "workdir=s"=>\$options{workdir},
	   "baseurl=s"=>\$options{baseurl},
	   "cstandard:s"=>\$options{cstandard},
	   "cmaninfor:s"=>\$options{cmaninfor},
	   "cmaninrev:s"=>\$options{cmaninrev},
	   "cnick:s"=>\$options{cnick},
	   "crestr:s"=>\$options{crestr},
	   "cdb1:s"=>\$options{cdb1},
	   "cdb2:s"=>\$options{cdb2},
	   "cname:s"=>\$options{cname},
	   "tm:s"=>\$options{tm},
	   "sc:s"=>\$options{sc},
	   "pc:s"=>\$options{pc},
	   "co:s"=>\$options{co},
	   "ci:s"=>\$options{ci},
	   "verbose:s"=>\$options{verbose});
	   	   


###################################################################	   
#if in debugging mode, give message


my $verbose;

if ($options{verbose} eq "y") {
	$verbose = "TRUE";
	print "\n## DEBUG MODE MESSAGES ##\n";
} 




###################################################################	   
#the filename inputs are handled 
	   

my $inputfasta;		#Single-fasta input filename
if ($options{i} eq "+") {
	$inputfasta = <STDIN>;
}
else {
	$inputfasta = $options{i};
}

my $outreport;		#Report output filename
my $outreportshort;		#Report output filename without path if given by wrapper
if ($options{r} eq "+") {
	$outreport = <STDIN>;
}
else {
	$outreport = $options{r};
	$outreport =~ m/.*\/(\w+\.html)/;
	#$outreportshort = $1;
	$outreportshort = "report.txt";
}

my $fastaout;		#Fasta output filename
my $fastaoutshort;		#Fasta output filename without path if given by wrapper
if ($options{o} eq "+") {
	$fastaout = <STDIN>;
}
else {
	$fastaout = $options{o};
	$fastaout =~ m/.*\/(\w+\.html)/;
	#$fastaoutshort = $1;
	$fastaoutshort = "primers.fsa";
}

my $htmlreport;		#html file of output
my $htmlreportshort;		#html file of output without path if given by wrapper
$htmlreport = $options{h};
$htmlreport =~ m/.*\/(\w+\.html)/;
#$htmlreportshort = $1;
$htmlreportshort = "report.html";


###################################################################
#The cassette input options are then handled. The array @cassette 
#will contain all information. $cassette[0] = forward strand, 
#$cassette[1] = reverse strand, $cassette[2] = forward strand 
#fusion tail, $cassette[3] = reverse strand fusion tail, 
#$cassette[4] = cassette name, $cassette[5] = pre-contruct cassette 
#sequence, $cassette[6] = post-contruct cassette sequence.

#If a cassette is selected from the standard list:


my @cassette;		#Array containing cassette data
my $cassetteprint;	#Variable which will contain cassette details for print
unless ($options{cstandard} eq "") {
	if ($options{cstandard} eq "PacI/Nt.BbvCI") {
		$cassette[0] = "GCTGAGGGTTTAATTAAGACCTCAGC";
		$cassette[1] = "CGACTCCCAAATTAATTCTGGAGTCG";
		$cassette[2] = "GGGTTTAAU";
		$cassette[3] = "GGTCTTAAU";
		$cassette[4] = "PacI/Nt.BbvCI";
		$cassette[5] = "GCTGA";
		$cassette[6] = "TCAGC";
	}
	elsif ($options{cstandard} eq "XbaI2/Nt.BbvCI") {
		$cassette[0] = "GCTGAGGGAAAGTCTAGAGGATCCTCTAGATGTCTCCTCAGC";
		$cassette[1] = "CGACTCCCTTTCAGATCTCCTAGGAGATCTACAGAGGAGTCG";
		$cassette[2] = "GGGAAAGU";
		$cassette[3] = "GGAGACAU";
		$cassette[4] = "XbaI(2)/Nt.BbvCI";
		$cassette[5] = "GCTGA";
		$cassette[6] = "TCAGC";
	}
	elsif ($options{cstandard} eq "PmeI/Nb.BbvCI") {
		$cassette[0] = "CCTCAGCCGTTTAAACAGCTGAGG";
		$cassette[1] = "GGAGTCGGCAAATTTGTCGACTCC";
		$cassette[2] = "GCCGTTU";
		$cassette[3] = "GCTGTTU";
		$cassette[4] = "PmeI/Nb.BbvCI";
		$cassette[5] = "CCTCA";
		$cassette[6] = "TGAGG";
	}
	elsif ($options{cstandard} eq "AsiSI/Nb.BsmI") {
		$cassette[0] = "GAATGCGTGCGATCGCGTGCATTC";
		$cassette[1] = "CTTACGCACGCTAGCGCACGTAAG";
		$cassette[2] = "CGTGCGAU";
		$cassette[3] = "CACGCGAU";
		$cassette[4] = "AsiSI/Nb.BSMI";
		$cassette[5] = "GAATG";
		$cassette[6] = "CATTC";
	}
	elsif ($options{cstandard} eq "AsiSI/Nb.BtsI") {
		$cassette[0] = "GCAGTGAGAGCGATCGCAGACACTGC";
		$cassette[1] = "CGTCACTCTCGCTAGCGTCTGTGACG";
		$cassette[2] = "AGAGCGAU";
		$cassette[3] = "TCTGCGAU";
		$cassette[4] = "AsiSI/Nb.BtsI";
		$cassette[5] = "GCAGT";
		$cassette[6] = "TGACG";
	}
	else {
		die "ERROR: unknown standard cassette input option: \"$options{cstandard}\"\n";
	}
	$cassetteprint = "standard cassette selected: $cassette[4]\n* cassette forward strand: $cassette[0]\n* cassette reverse strand: $cassette[1]";
}



###################################################################
#Determining whether input is single or multi sequence input


my $n = 0;

open IN, "<", "$options{i}" or die "ERROR: you have entered invalid filename(s): $!";
my $line = <IN>;
chomp $line;

while (defined $line) {
	if ($line =~ m/>/) {
		$n++;
	}
	$line = <IN>;
	chomp $line;
}
close IN;



###################################################################
#Setting output path for batch outputs


my $outputpath;
my $outputurl;
if ($options{workdir} ne "") {
	$outputpath = $options{workdir};
	# system("mkdir $outputpath");
}
elsif ($options{workdir} eq "") {
	$outputpath = ".";
}
if ($options{baseurl} ne "") {
	$outputurl = $options{baseurl};
}
elsif ($options{baseurl} eq "") {
	$outputurl = ".";
}

if ($verbose eq "TRUE") {
	print "output URL: $outputurl\n";
}


###################################################################
#If a cassette is designed from the list of nicking/restriction 
#sites: The input will be the names of the two selected sites, so 
#first a table with the correponding sequences is made:


my %restrictionsites = ("AsiSI"=>"GCGAT.CGC", 
						"PacI"=>"TTAAT.TAA",
						"PmeI"=>"GTTT.AAAC",
						"SwaI"=>"ATTT.AAAT",
						"XbaI"=>"T.CTAGA",
						"MssI"=>"GTTT.AAAC",
						"RgaI"=>"GCGAT.CGC",
						"SgfI"=>"GCGAT.CGC",
						"SmiI"=>"ATTT.AAAT",
						"SrfI"=>"GCCC.GGGC");

my %nickingsites = ("Nb.BbvCI"=>"CCTCA.GC",
		    		"Nb.BsmI"=>"GAATG.CT",
		    		"Nb.BsrDI"=>"GCAATG.GG",
		    		"Nb.BtsI"=>"GCAGTG.CT",
		    		"Nt.AlwI"=>"C.TCTCGATCC",
		    		"Nt.BbvCI"=>"GCTGA.GG",
		    		"Nt.BsmAI"=>"C.AGAGAC",
		    		"Nt.BspQI"=>".AGAAGAGC",
		    		"Nt.BstNBI"=>"T.TAGTCTGAT");



###################################################################
#Then the for/rev strand and fusion tails are deduced from the 
#input:

my $db1;
my $db2;
unless ($options{crestr} eq "" and $options{cnick} eq "") {
	$db1 = uc $options{cdb1};
	$db2 = uc $options{cdb2};
	my $cassette_ref = &cassettenickandrestr(\%options, \%restrictionsites, \%nickingsites, $db1, $db2);
	@cassette = @$cassette_ref;

	$cassetteprint = "custom cassette: $cassette[4]\ncassette forward strand: $cassette[0]\ncassette reverse strand: $cassette[1]";
}



###################################################################
#If a cassette is specified from manual input:


unless ($options{cmaninfor} eq "" and $options{cmaninrev} eq "") {
	my $cassette_ref = &cassettemanin(\%options, \@cassette);
	@cassette = @$cassette_ref;
	$cassetteprint = "custom cassette (manual input)\ncassette forward strand: $cassette[0]\ncassette reverse strand: $cassette[1]";
}



###################################################################
#If no cassette is chosen (linear cloning).


my $nocassette = "FALSE";
if ($cassetteprint eq "") {
	$cassetteprint = "linear cloning (no cassette)";
	$nocassette = "TRUE";
}



###################################################################
#If Tm optimimization is selected, the desired Tm is stored. 
#$Tmtarget is either a numerical value or "eq".


my $Tmtarget = "";
if ($options{tm} ne "") {
	$Tmtarget = $options{tm};
	unless ($Tmtarget eq "eq") {
		if ($Tmtarget < 40 or $Tmtarget > 72) {
			die "ERROR: tm target must be between 40 and 72\n";
		}
	}	
}



###################################################################
#If circular assembly is selected, a flag is raised


my $circularoutput = "";
if ($options{co} eq "y") {
	$circularoutput = "TRUE";
	$cassetteprint = "circular assembly (no cassette)";
	if ($options{cstandard} ne "" or $options{cmaninfor} ne "" or $options{cmaninrev} ne "" or $options{cnick} ne "" or $options{crestr} ne "") {
		die "ERROR: a cassette cannot be added when circular assembly is selected\n";
	}
}



###################################################################
#If circular input is selected, a flag is raised


my $circularinput = "";
if ($options{ci} eq "y") {
	$circularinput = "TRUE";
	$circularoutput = "";
	$cassetteprint = "circular assembly (no cassette)";
	if ($options{cstandard} ne "" or $options{cmaninfor} ne "" or $options{cmaninrev} ne "" or $options{cnick} ne "" or $options{crestr} ne "") {
		die "ERROR: a cassette cannot be added when circular assembly is selected\n";
	}
}



###################################################################
#The input fasta file is opened in a filehandle and processed. The 
#array @input[$i][1] will contain the names of the sequences, extracted 
#from the first word in the fasta header. The array @brickseq will 
#contain the corresponding sequence. Name and sequence will be 
#saved so that position in the two arrays correspond, i.e. name [1] 
#match sequence [1]. Also, if inserts are entered in the fasta 
#input, they are saved in the array @inserts.


my ($input_ref, $batchinput, $inputcount_ref, $backbone) = &inputfile($inputfasta, $circularoutput);
my @input = @$input_ref;
my @inputcount = @$inputcount_ref;
my $numberofinputs = 1;
my $numberofbatches = 99;
my @inputs;
my @batchoutput;

# if($batchinput eq "TRUE") {
# 	print "backbone value $backbone\n";
# }
if ($batchinput eq "TRUE") {
	my ($numberofbatches_ref, $inputs_ref, $inputcount_ref) = &batchinputconversion(\@input);
	$numberofbatches = $numberofbatches_ref;
	@inputs = @$inputs_ref;
	@inputcount = @$inputcount_ref;
	$numberofinputs = scalar @inputs;
	# print "number of inputs $numberofinputs\n";
}
else {
	$inputs[0] = [@input];
}


# for (my $xx = 0; $xx < $numberofinputs; $xx++) {
# 	# for (my $y = 0; $y < scalar $n; $y++) {
# 		print "input: $xx\n";
# 		for (my $z = 0; $z < scalar @{$inputs[$xx]}; $z++) {
# 			print "seq$z\n$inputs[$xx][$z][2]\n";
# 		}
# 		my $z = scalar @{$inputs[$xx]};
# 		print "\n";
# 	# }
# }
# print "$n\n";



###################################################################
#Short fragments (> 80 bp) arising from linkers, mutations, or 
#insertions are split up and added to the fragment preceeding and
#following, thus extending the primers for these fragments. If the
#fragment is first or last in the total construct, the length 
#restrictions is halved, such that the length of a fragment in the
#beginning or end of a construct has to be < 40 or > 80. In 
#addition to appending the @inputs array, the array 
#@primerextension holds the length extension for each primer.


my ($inputs_ref, $primerextension_ref, $numberofinserts) = &primerextension(\@inputs, $circularoutput);
@inputs = @$inputs_ref;
my @primerextension = @$primerextension_ref;

# for (my $y = 0; $y <= scalar $n; $y++) {
# 	if ($primerextension[0][$y][0] eq "TRUE") {
# 		print "insert $y\n$primerextension[0][$y][1]\n";
# 	}
# }

###################################################################
#AMUSER is now executed once for each batch running


for (my $x = 0; $x < $numberofinputs; $x++) {
	my $n = scalar @{$inputs[$x]};


	###################################################################
	#If circular output is selected, the @input array is adjusted to
	#contain copies of gene 0 at the end and gene n in the beginning of
	#the array. If single input fragment is submitted, the fragment is 
	#copied only once.
	
	
	if ($circularoutput eq "TRUE") {
		my $inputs_ref = &circular(\@{$inputs[$x]}, $n);
		@{$inputs[$x]} = @$inputs_ref;
		$n = scalar @{$inputs[$x]};
	}
	# print "input: $x\n";
	# for (my $xx = 0; $xx < $numberofinputs; $xx++) {
	# 	# for (my $y = 0; $y < scalar $n; $y++) {
	# 	# 	print "$y\n";
	# 		for (my $z = 0; $z < scalar @{$inputs[$x]}; $z++) {
	# 			if ($primerextension[$x][$z][0] eq "TRUE") {
	# 				print "ext$z\n$primerextension[$x][$z][1]\n";
	# 			}
	# 			print "seq$z\n$inputs[$x][$z][2]\n";
	# 		}
	# 		my $z = scalar @{$inputs[$x]};
	# 		if ($primerextension[$x][$z][0] eq "TRUE") {
	# 			print "ext$z\n$primerextension[$x][$z][1]\n";
	# 		}
	# 		print "\n";
	# 	# }
	# }
	# print "$n\n";



	###################################################################
	#The @linker array is then expanded to contain all information 
	#about the linkers. $linker[$i][0] contains the linker. 
	#$linker[$i][1] contains the front half, $linker[$i][2] the length 
	#of that half, $linker[$i][3] contains the back half, and 
	#$linker[$i][4] the length of that half. 
	
	
	# if ($linkerflag == 1) {
	# 	%linker = &linkerexpand(\%linker);
	# }
	
	
	
	###################################################################
	#Two sub fragments from each of sequences; the first and last 40 
	#bases are extracted and saved in an array of two arrays - one for 
	#the first 40 and one for the last 40 for easy access purposes. If 
	#linkers are added they will be accounted for in the sub fragments
	

	my $brickseqfrags_ref = &brickseqfrags(\@{$inputs[$x]}, $n, \@{$primerextension[$x]}, $circularoutput);
	my @brickseqfrags = @$brickseqfrags_ref;

	# for (my $y = 0; $y < scalar @{$inputs[$x]}; $y++) {
	# 	print "brickseqfrags $y front\t$brickseqfrags[$y][0]\nbrickseqfrags $y end\t$brickseqfrags[$y][1]\n";
	# }
	
	
	###################################################################
	#The last seqfrag is linked together with the first from the next 
	#brick into an 80 base fragment. This is then saved in the array 
	#@joined
	
	
	my $joined_ref = &joined(\@brickseqfrags, $n);
	my @joined = @$joined_ref;
	# print "batch $x\n";
	# for (my $y = 0; $y < scalar @{$inputs[$x]}; $y++) {
	# 	print "$inputs[$x][$y][1] $y $inputs[$x][$y][2]\n\n";
	# 	print "joined $y: $joined[$y]\n\n";
	# }
	
	
	###################################################################
	#Two array tables are created. The array @A contains a list of all 
	#positions of A's in the sequence, and @T contains the positions of 
	#T's. The data in each of these two tables are saved as 
	#$A/T[$i][$Apos], where $i links it to the sequence it was found 
	#in, and [$A/Tpos] gives the position of the A/T.
	
	
	$n = scalar @{$inputs[$x]};
	my ($A_ref, $T_ref) = &ATpos(\@joined, $n, $batchinput);
	my @A = @$A_ref;
	my @T = @$T_ref;

	
	
	###################################################################
	#Then, each possible A-T segment is scored. Since the relative 
	#penalty for an A-T segment that is too long/short, and an A-T 
	#segment not centered is the same, a simple scoring system is 
	#defined: The penalty is simply +1 for each amino a segment is 
	#longer than 9 or shorter than 7, and +1 for each amino acid the 
	#center of the segment deviates from the center of the fragment we 
	#called "$joined". The reason that the penalty is the same in each 
	#case, is that the consequence in each case is the same: an 
	#increase in length of the primer by 1 aa. The score and segment 
	#range is then saved in an array table: @scoredfts. This enables 
	#the program to quickly retrieve the next best scoring A-T segment, 
	#in case the primer from the first are no good.
	

	my $scoredfts_ref = &ATscore(\@joined, \@A, \@T, $n);
	my @scoredfts = @$scoredfts_ref;
   
	my $scores_ref = &scores(\@scoredfts, $n);
	my @scores = @$scores_ref;

	# for (my $y = 0; $y < (scalar @{$inputs[$x]}) -1; $y++) {
	# 	for (my $z = 0; $z < scalar @{$scoredfts[$y]}; $z++) {
	# 		print "$y\t$z\t$scoredfts[$y][$z]\n";
	# 	}
	# }
	
	
	###################################################################
	#Arrays are now made containing all the allowed lengths of binding 
	#region, so that these can be varied to have the same Tm on the 
	#same sequence for PCR
	
	
	my ($Apos_ref, $Tpos_ref, $brfor_ref, $brrev_ref, $fts_ref, $brforpos_ref, $brrevpos_ref) = &bindingregion(\@scoredfts, \@joined, $n);
	
	my @Apos = @$Apos_ref;		#Array containing the best scoring non-clashing fusion tail A position in $joined for fusion tail ranked $ii
	my @Tpos = @$Tpos_ref;		#Array containing the best scoring non-clashing fusion tail T position in $joined for fusion tail ranked $ii
	my @brfor = @$brfor_ref;	#Array containing binding regions for forward primer on biobrick $i for fusion tail ranked $ii
	my @brrev = @$brrev_ref;	#Array containing binding regions for reverse primer on biobrick $i for fusion tail ranked $ii
	my @fts = @$fts_ref;		#Array containing actual best scoring non-clashing fusion tail sequence for fusion tail ranked $ii
	my @brforpos = @$brforpos_ref;
	my @brrevpos = @$brrevpos_ref;


	#print "$brrev[0][0][20]\n";

	# for (my $y = 0; $y < scalar @{$inputs[$x]}; $y++) {
	# 	for (my $z = 0; $z < $n-1; $z++) {
	# 		print "forward position for $z: $brforpos[$z][0] T position: $Tpos[$z][0]\n";
	# 		print "reverse position for $z: $brrevpos[$z][0] A position: $Apos[$z][0]\n";
	# 		# for (my $k = 0; $k < scalar @{$brfor[$y][$z]}; $k++) {
	# 		# 	print "$y\t$brfor[$y][$z][$k]\n";
	# 		# }
	# 	}
	# }

	
	
	###################################################################
	#Similarly this is done for the bases on the first and last 
	#sequence. Since we already know where these fragments will start 
	#(next to the cassette), we don't have to worry about fusion tails
	#and simply start the binding region from base 1 on sequence 1 and 
	#on base length-$i on sequence $n
	
	
	for (my $i = 18; $i < 25; $i++) {
		$brfor[0][0][$i] = substr ($brickseqfrags[0][0], 0, $i);
		$brrev[$n-1][0][$i] = substr ($brickseqfrags[$n-1][1], 50 - $i, $i);
		$brrev[$n-1][0][$i] =~ tr/ATGCRYKMBVDHSW/TACGYRMKVBHDWS/;
	}
	#print "$brfor[0][0][20]\n";


	# for (my $y = 0; $y < $n; $y++) {
	# 	print "$joined[$y]\n";
	# 	for (my $z = 18; $z < 25; $z++) {
	# 		print "$y $z for $brfor[$y][0][$z]\n";
	# 		print "$y $z rev $brrev[$y][0][$z]\n";
	# 	}
	# }

	
	###################################################################
	#The following algorithm is designed to removed ft clashes. It does 
	#so by comparing all fts and removing the one with best scoring 
	#next alternative if there is a clash. In case the two alternatives
	#have the same score, the one with the most following alternatives 
	#will be removed.
	

	my $ft_ref = &rmclashft(\@fts, \@scores, \@brrev, \@brfor, \@Apos, \@Tpos, \@scoredfts, $n);
	my @ft = @$ft_ref;
	

	
	###################################################################
	#Now to replace thymine with uracil at the end of the ft and the 
	#complement ft, the former saved in the already existing array @ft, 
	#and the latter saved in the array @ftcomp
	
	
	my ($ft_ref, $ftcomp_ref) = &uracilft(\@ft, $n);
	@ft = @$ft_ref;
	my @ftcomp = @$ftcomp_ref;
	
	
		
	###################################################################
	#If a short (< 80) fragment is inserted between fragments, the
	#primers are extended to encompass the short fragment between
	#fusion tails and binding regions.
	

	my $primerextension_ref = &extensions(\@primerextension, \@joined, \@brforpos, \@brrevpos, \@ft, $n, \@Apos, \@Tpos, \@brrev, \@brfor);
	@primerextension = @$primerextension_ref;

	# for (my $y = 0; $y < scalar @inputs; $y++) {
	# 	for (my $z = 0; $z < $n; $z++) {
	# 		print "$z\tforward: $primerextension[$y][$z][4]\n";
	# 		print "$z\treverse: $primerextension[$y][$z][5]\n";
	# 	}
	# }


	###################################################################
	#Now to make sure that primers on the same DNA fragment has similar 
	#Tm, as well as falling into the optimal range of 55 to 72, Tm for 
	#all 7 binding regions (both forward and reverse), is calculated 
	#and compared to the appropriate counterpart. If Tm is out of the 
	#optimum, or not similar to counterpart binding region, the length 
	#of one or both (if needed) is adjusted within the specified 
	#lengths of 18 to 24.
	#First, the counting of A, T, G, and C in each of the 14 binding 
	#regions from each DNA fragment:
	

	
	my ($Afor_ref, $Tfor_ref, $Gfor_ref, $Cfor_ref, $Arev_ref, $Trev_ref, $Grev_ref, $Crev_ref) = &ATGCcount(\@brfor, \@brrev, $n);
	
	my @Afor = @$Afor_ref;	#Count of A's in forward primer
	my @Tfor = @$Tfor_ref;	#Count of T's in forward primer	
	my @Gfor = @$Gfor_ref;	#Count of G's in forward primer
	my @Cfor = @$Cfor_ref;	#Count of C's in forward primer
	my @Arev = @$Arev_ref;	#Count of A's in reverse primer
	my @Trev = @$Trev_ref;	#Count of T's in reverse primer
	my @Grev = @$Grev_ref;	#Count of G's in reverse primer
	my @Crev = @$Crev_ref;	#Count of C's in reverse primer
	
	
	
	###################################################################
	#Calling salt concentration and primer concentration parameters if
	#these have been selected, otherwise the variables are set to their
	#default values
	
	
	my $sc = 0.05;
	my $pc = 0.00000005;
	if (exists $options{sc} and $options{sc} ne "") {
		$sc = $options{sc} / 1000;
		if ($sc < 10/1000 or $sc > 150/1000) {
			die "ERROR: salt concentration must be between 10 and 150 nM\n";
		}
	}
	if (exists $options{pc} and $options{pc} ne "") {
		$pc = $options{pc} / 1000000;
		if ($pc < 0.05/1000000 or $pc > 5/1000000) {
			die "ERROR: primer concentration must be between 0.05 and 5 uM\n";
		}
	}
	
	
	
	###################################################################
	#####                        SINGLESEQ                		  #####
	###################################################################
	
	
	if ($n == 1) {
		

	
		###################################################################
		#Then calculation of GC ratio for each element. The results are 
		#saved as the fourth dimension of @TmGCrev and @TmGCfor (under 
		#array element [1])
		
		
		my @TmGCrev;
		my @TmGCfor;
		my ($TmGCrev_ref, $TmGCfor_ref) = &GCratiosingle(\@Afor, \@Tfor, \@Gfor, \@Cfor, \@Arev, \@Trev, \@Grev, \@Crev, \@brrev, \@brfor);
		@TmGCrev = @$TmGCrev_ref;
		@TmGCfor = @$TmGCfor_ref;
		
		
		
		###################################################################
		#Then calculation of Tm using the nearest-neighbor method, The 
		#results are saved as the fourth dimension of @TmGCrev and @TmGCfor 
		#(under array element [0])
		
		
		my ($TmGCrev_ref, $TmGCfor_ref) = &Tm(\@brfor, \@brrev, \@TmGCfor, \@TmGCrev, $sc, $pc, $n);
		@TmGCrev = @$TmGCrev_ref;
		@TmGCfor = @$TmGCfor_ref;
		
		
		
		###################################################################
		#Then for the comparision and optimization of Tm of reverse and 
		#forward binding regions on the same DNA fragment
		#The optimal binding regions in terms of Tm. For a given DNA 
		#fragment, $i, the optimal choice for reverse and forward binding 
		#region (length) is saved in the array $optbr[$i][0][$ii] for 
		#reverse, and $optbr[$i][1][$ii] for forward (where $i is the gene 
		#entry, and $ii are the Tm matches).
		
		
		my $optbr_ref; 
		my $primerTmwarning_ref;
		my @optbr;
		my %primerTmwarning;
		
		if ($Tmtarget eq "") {
			($optbr_ref, $primerTmwarning_ref) = &optbr(\@TmGCrev, \@TmGCfor, $n);
			@optbr = @$optbr_ref;
			%primerTmwarning = %$primerTmwarning_ref;
		}
		
		elsif ($Tmtarget ne "") {
			($optbr_ref, $primerTmwarning_ref, $Tmtarget) = &optbrTm(\@TmGCrev, \@TmGCfor, $Tmtarget, $n);
			@optbr = @$optbr_ref;
			%primerTmwarning = %$primerTmwarning_ref;
		}
		
		
		
		###################################################################
		#Analyzing for risk of primer dimer formation. This is simply done 
		#by aligning the bases of each primer in a set from length 5 (the 
		#smallest dimer that can cause problems) to full alignment. If a 
		#primer dimer risk is detected, a flag is saved in the hash 
		#%primerdimer{$i}{$ii} where $i is the gene, and $ii is the number 
		#of the Tm match.
		

		my $primerdimer_ref = &primerdimer(\@brrev, \@brfor, \@optbr, \@TmGCfor, \@TmGCrev, $n, $sc, $pc);
		my %primerdimer = %$primerdimer_ref;
		
		
		
		###################################################################
		#Testing for intra-primer homology is done by aligning segments of 
		#4 bases with the rest of the primer sequence. 3 bases in each end 
		#of the 4 base segment are replace by "---" for the alignment, 
		#since "snap-backs" only occur if a small loop can be formed. If an 
		#intra-primer homology risk is detected, a flag is saved in the 
		#hash %homology{$i}{$ii} where $i is the gene, and $ii is the 
		#number of the Tm match.
		
		
		my ($homologyrev_ref, $homologyfor_ref) = &homology(\@brrev, \@brfor, \@optbr, \@TmGCfor, \@TmGCrev, $n, $sc, $pc);
		my %homologyrev = %$homologyrev_ref;
		my %homologyfor = %$homologyfor_ref;
		
		
		
		###################################################################
		#Testing for presence of GC clamp is done simply by checking for 
		#the presence of G's or C's at the 3' end of a primer 
					
		
		my ($GCclamprev_ref, $GCclampfor_ref) = &GCclamp(\@brrev, \@brfor, \@optbr, $n);
		my %GCclamprev = %$GCclamprev_ref;
		my %GCclampfor = %$GCclampfor_ref;
		
		
		
		###################################################################
		#Testing for risk of too strong binding, i.e. more than 3 G/C's in 
		#last 5 bases of 3' end
		
		
		my ($GCcountclamprev_ref, $GCcountclampfor_ref) = &GCcountclamp(\@brrev, \@brfor, \@optbr, $n);
		my %GCcountclamprev = %$GCcountclamprev_ref;
		my %GCcountclampfor = %$GCcountclampfor_ref;
		
		
		
		###################################################################
		#Testing for presence of poly N stretches. Poly is in this case 
		#defined as more than 4 dentical nucleotides in a row
		
		
		my ($polyNrev_ref, $polyNfor_ref) = &polyN(\@brrev, \@brfor, \@optbr, $n);
		my %polyNrev = %$polyNrev_ref;
		my %polyNfor = %$polyNfor_ref;
		
		
		
		###################################################################
		#Now that all putative primers are analysed for the above mentioned
		#parameters, it's time to select the most optimal primers. This is
		#done either by ranking by all parameters. If desired Tm is defined
		#by the user, this step is skipped, since there is no variability
		#in the primers
		
		my $ranking_ref;
		my %ranking;
		
		if ($Tmtarget eq "") {
			$ranking_ref = &optbranalysis(\@optbr, \@TmGCrev, \@TmGCfor, \%primerdimer, \%homologyrev, \%homologyfor, \%GCclamprev, \%GCclampfor, \%GCcountclamprev, \%GCcountclampfor, \%polyNrev, \%polyNfor, \%ranking, $n);
			%ranking = %$ranking_ref;
		}
		
		elsif ($Tmtarget ne "") {
			for (my $i = 0; $i < $n-1; $i++) {
				$ranking{$i}{0} = 0;
			}
		}
		
		
		###################################################################
		#####              PRINTING SINGLE SEQ RESULTS                #####
		###################################################################
		
		
		
		#For the printing, all reverse primers must be complemented
		
		
		$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		
		
		
		#First a quick overview of the needed primers is printed to the 
		#screen output report
		
		
		push(@{$outreportarray[$x]}, "--------------------------------------\n");
		push(@{$outreportarray[$x]}, "AMUSER $version\n");
		push(@{$outreportarray[$x]}, "output generated: $mday-$mon-$year $hour:$min:$sec\n");
		push(@{$outreportarray[$x]}, "--------------------------------------");
		push(@{$outreportarray[$x]}, "\n\n");
		push(@{$outreportarray[$x]}, "input parameters:\n");
		push(@{$outreportarray[$x]}, "-----------------\n");
		push(@{$outreportarray[$x]}, "number of fragments: $inputcount[$x]\n");
		unless ($numberofinserts == 0) {
			push(@{$outreportarray[$x]}, "number of inserts: $numberofinserts\n");
		}
		if ($options{sc} ne "" or $options{pc} ne "") {
			my $tempsc = $sc * 1000;
			my $temppc = $pc * 1000000;
			push(@{$outreportarray[$x]}, "salt concentration selected: $tempsc nM\n");
			push(@{$outreportarray[$x]}, "primer concentration selected: $temppc uM\n");
		}
		if($Tmtarget ne "") {
			my $templine = "tm optimized to: $Tmtarget ";
			if ($options{tm} eq "eq") {
				$templine .= "C (all primer Tm approximated to each other)";
			}
			else {
				$templine .= "C (user defined)";
			}
			push(@{$outreportarray[$x]}, "$templine\n");
		}
		push(@{$outreportarray[$x]}, "$cassetteprint\n\n\n"); 
		push(@{$outreportarray[$x]}, "overview of the needed primers (5'-3'):\n");
		push(@{$outreportarray[$x]}, "---------------------------------------\n\n");
		push(@{$outreportarray[$x]}, "fragment\tstrand\ttm\tprimer\n");
		push(@{$outreportarray[$x]}, "$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][1]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
		$brrev[0][0][$optbr[0][0][$ranking{0}{0}]] = reverse $brrev[0][0][$optbr[0][0][$ranking{0}{0}]];
		$primerextension[$x][1][1] = reverse $primerextension[$x][1][1];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		push(@{$outreportarray[$x]}, "$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$cassette[3]$primerextension[$x][1][1]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
		$brrev[0][0][$optbr[0][0][$ranking{0}{0}]] = reverse $brrev[0][0][$optbr[0][0][$ranking{0}{0}]];
		$primerextension[$x][1][1] = reverse $primerextension[$x][1][1];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		
		
		#If there is any warnings in the primer details section, the user is given a heads up:
		
		
		my $warningflag = 0;
		
		unless (55 < $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0] and 72 > $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]) {
			$warningflag = 1;
		}
		
		unless (39.9 < $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
			$warningflag = 1;
		}
		
		unless (exists $GCclampfor{0}{0}) {
			$warningflag = 1;
		}
		
		if (exists $GCcountclampfor{0}{0}) {
			$warningflag = 1;
		}
		
		if (exists $primerdimer{0}{0}) {
			$warningflag = 1;
		}
		
		if (exists $homologyfor{0}{0}) {
			$warningflag = 1;
		}	
		
		if (exists $polyNfor{0}{0}) {
			$warningflag = 1;
		} 
		
		
		$brrev[0][0][$optbr[0][0][$ranking{0}{0}]] = reverse $brrev[0][0][$optbr[0][0][$ranking{0}{0}]];
		unless (55 < $TmGCrev[0][0][$optbr[0][0][0]][0] and 72 > $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]) {
			$warningflag = 1;
		}
		
		unless (39.9 < $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
			$warningflag = 1;
		}
		
		unless (exists $GCclamprev{$n-1}{0}) {
			$warningflag = 1;
		}
		
		if (exists $GCcountclamprev{$n-1}{0}) {
			$warningflag = 1;
		}
		
		if (exists $primerdimer{$n-1}{0}) {
			$warningflag = 1;
		}
		
		if (exists $homologyrev{$n-1}{0}) {
			$warningflag = 1;
		}
		
		if (exists $polyNfor{$n-1}{0}) {
			$warningflag = 1;
		} 
		
		if (exists $primerTmwarning{$n-1}) {
			$warningflag = 1;
		}
		
		if ($warningflag == 1) {
			push(@{$outreportarray[$x]},  "attention: one or more of the designed primers may have undesirable properties\n");
			push(@{$outreportarray[$x]},  "please see \"primer details\" section\n\n\n");
		}
		
		
		
		if ($circularoutput eq "TRUE") {
			push(@{$outreportarray[$x]},  "overview of your final construct after cloning (circular):\n");
			push(@{$outreportarray[$x]},  "----------------------------------------------------------\n\n");
		}
		else {
			push(@{$outreportarray[$x]},  "overview of your final construct after cloning:\n");
			push(@{$outreportarray[$x]},  "-----------------------------------------------\n\n");
		}

		my $string = "";
		my $insertcounter = 1;
		if ($cassette[4] ne "") {
			$string .= "$cassette[4],,";
		}
		if ($primerextension[$x][0][0] eq "TRUE") {
			$string .= "insert$insertcounter,,";
			$insertcounter++;
		}
		$string .= "$inputs[$x][0][1],,";
		if ($primerextension[$x][1][0] eq "TRUE") {
			$string .= "insert$insertcounter,,";
			$insertcounter++;
		}
		if ($cassette[4] ne "") {
			$string .= "$cassette[4]";
		}
		else {
			chop $string;
			chop $string;
		}
		$string .= "\n\n\n";
		push(@{$outreportarray[$x]}, "$string");
		
		#Then a graphic overview of the non-fusion tail, the fusion tail, and the binding region 
		#is printed to the screenout file
		
		
		
		my $cassetteftnoUpre = $cassette[2];
		$cassetteftnoUpre =~ tr/U/T/;
		my $cassetteftnoUpost = $cassette[3];
		$cassetteftnoUpost =~ tr/U/T/;
		$cassetteftnoUpost = reverse $cassetteftnoUpost;
		$cassetteftnoUpost =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		
		push(@{$outreportarray[$x]}, "graphic overview of DNA fragments and primers:\n");
		push(@{$outreportarray[$x]}, "----------------------------------------------\n\n");
		
		if ($nocassette eq "TRUE") {
			push(@{$outreportarray[$x]}, "forward primer for $inputs[$x][0][1]:\n\n");
			push(@{$outreportarray[$x]}, "5'-$primerextension[$x][0][1]$brfor[0][0][$optbr[0][1][0]]-3'\n");		
		}
		else {
			push(@{$outreportarray[$x]}, "fusion region and forward primer for joining of $cassette[4] and $inputs[$x][0][1]:\n\n");
			my $space = "";
			for (my $ii = 0; $ii < (length $cassette[5]); $ii++) {
				$space .= " ";
			}
			push(@{$outreportarray[$x]}, "$space");
			push(@{$outreportarray[$x]}, "5'-$cassette[2]\n");
			my $space = "";
			for (my $ii = 0; $ii < 3+(length $cassette[2])+(length $cassette[5]); $ii++) {
				$space .= " ";
			}	
			push(@{$outreportarray[$x]}, "$space$primerextension[$x][0][1]$brfor[0][0][$optbr[0][1][0]]-3'\n");
		}
		push(@{$outreportarray[$x]}, "5'-$cassette[5]$cassetteftnoUpre$primerextension[$x][0][1]$brickseqfrags[0][0]\[...]-3'\n\n");
		
		
		push(@{$outreportarray[$x]},  "fusion region and reverse primer for joining of $inputs[$x][$n-1][1] and $cassette[4]:\n\n");
		push(@{$outreportarray[$x]},  "5'-[...]$brickseqfrags[$n-1][1]$primerextension[$x][1][1]$cassetteftnoUpost$cassette[6]-3'\n");
		
		my $space = "";
		for (my $ii = 0; $ii < (length $brickseqfrags[$n-1][1])+5-(length $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]); $ii++) {
			$space .= " ";
		}
		
		$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		my $templine = $space;
		if ($nocassette eq "TRUE") {
			$templine .= "3'-$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]$primerextension[$x][1][1]-5'";
			push(@{$outreportarray[$x]},  $templine);
		}
		else {
			$templine .= "3'-$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]$primerextension[$x][1][1]";
			push(@{$outreportarray[$x]},  "$templine\n");
			my $space = "";
			for (my $ii = 0; $ii < (length $brickseqfrags[$n-1][1])+8 + length $primerextension[$x][1][1]; $ii++) {
				$space .= " ";
			}
			$cassette[3] = reverse $cassette[3];
			push(@{$outreportarray[$x]},  "$space$cassette[3]-5'\n");
			$cassette[3] = reverse $cassette[3];
		}
		$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		push(@{$outreportarray[$x]},  "\n\n\n");
		
		
		#Detailed descriptions of the primers are then printed to the screenout file
		
		
		push(@{$outreportarray[$x]},  "primer details:\n");
		push(@{$outreportarray[$x]},  "---------------\n\n");
		push(@{$outreportarray[$x]},  "primer details for $inputs[$x][0][1]\n\n");
		push(@{$outreportarray[$x]},  "forward primer: $cassette[2]$primerextension[$x][0][1]$brfor[0][0][$optbr[0][1][0]]\n");
		
		if (55 < $TmGCfor[0][0][$optbr[0][1][0]][0] and 72 > $TmGCfor[0][0][$optbr[0][1][0]][0]) {
			push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[0][0][$optbr[0][1][0]][0]\C - in optimal range (55-72)?                   ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[0][0][$optbr[0][1][0]][0]\C - in optimal range (55-72)?                   ...NO\n");
		}
		
		if (39.9 < $TmGCfor[0][0][$optbr[0][0][0]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][0]][1]) {
			push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[0][0][$optbr[0][0][0]][1]\% - in optimal range (40-60)?          ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[0][0][$optbr[0][0][0]][1]\% - in optimal range (40-60)?          ...NO\n");
		}
		
		if (exists $GCclampfor{0}{0}) {
			push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
		}
		
		if (exists $GCcountclampfor{0}{0}) {
			push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
		}
		
		if (exists $primerdimer{0}{0}) {
			push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
		}
		
		if (exists $homologyfor{0}{0}) {
			push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
		}	
		
		if (exists $polyNfor{0}{0}) {
			push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
		} 
		push(@{$outreportarray[$x]},  "\n");
		
		
		
		
		
		
		
		#$brrev[$n-1][0][$optbr[$n-1][0][0]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][0]];
		$primerextension[$x][1][1] = reverse $primerextension[$x][1][1];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		push(@{$outreportarray[$x]},  "reverse primer: $cassette[3]$primerextension[$x][1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
		$primerextension[$x][1][1] = reverse $primerextension[$x][1][1];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		if (55 < $TmGCfor[0][0][$optbr[0][1][0]][0] and 72 > $TmGCfor[0][0][$optbr[0][1][0]][0]) {
			push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[0][0][$optbr[0][0][0]][0]\C - in optimal range (55-72)?                   ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[0][0][$optbr[0][0][0]][0]\C - in optimal range (55-72)?                   ...NO\n");
		}
		
		if (39.9 < $TmGCfor[0][0][$optbr[0][0][0]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][0]][1]) {
			push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$n-1][0][$optbr[$n-1][0][0]][1]\% - in optimal range (40-60)?          ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$n-1][0][$optbr[$n-1][0][0]][1]\% - in optimal range (40-60)?          ...NO\n");
		}
		
		if (exists $GCclampfor{$n-1}{0}) {
			push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
		}
		
		if (exists $GCcountclampfor{$n-1}{0}) {
			push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
		}
		
		if (exists $primerdimer{$n-1}{0}) {
			push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
		}
		
		if (exists $homologyfor{$n-1}{0}) {
			push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
		}	
		
		if (exists $polyNfor{$n-1}{0}) {
			push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
		}
		else {
			push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
		}
		
		push(@{$outreportarray[$x]},  "\n");
			
		if (exists $primerTmwarning{$n-1}) {
			push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...NO\n");
		}
		else {
			push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...YES\n");
		}
		push(@{$outreportarray[$x]},  "\n\n");
		
		#Lastly, the final construct is printed to the screenout for good meassures
		
		
		
		my $final = "";
		
		if ($cassette[5] eq "") {
			if ($primerextension[$x][0][0] eq "TRUE" and $primerextension[$x][1][0] eq "TRUE") {
				$final .= lc $primerextension[$x][0][1];
				$final .= uc $inputs[$x][0][2];
				$final .= lc $primerextension[$x][1][1];
			}
			elsif ($primerextension[$x][0][0] eq "TRUE" and $primerextension[$x][1][0] ne "TRUE") {
				$final .= lc $primerextension[$x][0][1];
				$final .= uc $inputs[$x][0][2];
			}
			elsif ($primerextension[$x][0][0] ne "TRUE" and $primerextension[$x][1][0] eq "TRUE") {
				$final .= uc $inputs[$x][0][2];
				$final .= lc $primerextension[$x][1][1];
			}
			elsif ($primerextension[$x][0][0] ne "TRUE" and $primerextension[$x][1][0] ne "TRUE") {
				$final .= uc $inputs[$x][0][2];
			}
		}
		elsif ($cassette[5] ne "") {
			if ($primerextension[$x][0][0] eq "TRUE" and $primerextension[$x][1][0] eq "TRUE") {
				$final .= uc $cassette[5];
				$final .= uc $cassetteftnoUpre;
				$final .= lc $primerextension[$x][0][1];
				$final .= uc $inputs[$x][0][2];
				$final .= lc $primerextension[$x][1][1];
				$final .= uc $cassetteftnoUpost;
				$final .= uc $cassette[6];
			}
			elsif ($primerextension[$x][0][0] eq "TRUE" and $primerextension[$x][1][0] ne "TRUE") {
				$final .= uc $cassette[5];
				$final .= uc $cassetteftnoUpre;
				$final .= lc $primerextension[$x][0][1];
				$final .= uc $inputs[$x][0][2];
				$final .= lc $cassetteftnoUpost;
				$final .= lc $cassette[6];
			}
			elsif ($primerextension[$x][0][0] ne "TRUE" and $primerextension[$x][1][0] eq "TRUE") {
				$final .= uc $cassette[5];
				$final .= uc $cassetteftnoUpre;
				$final .= lc $inputs[$x][0][2];
				$final .= uc $primerextension[$x][1][1];
				$final .= lc $cassetteftnoUpost;
				$final .= lc $cassette[6];
			}
			elsif ($primerextension[$x][0][0] ne "TRUE" and $primerextension[$x][1][0] ne "TRUE") {
				$final .= uc $cassette[5];
				$final .= uc $cassetteftnoUpre;
				$final .= lc $inputs[$x][0][2];
				$final .= uc $cassetteftnoUpost;
				$final .= uc $cassette[6];
			}
		}
		
		my $templength = length($final);
		if ($circularoutput eq "TRUE") {
			push(@{$outreportarray[$x]},  "details of final construct after cloning (circular, length: $templength bases):\n");
			push(@{$outreportarray[$x]},  "------------------------------------------------------------------------\n\n");
		}
		else {
			push(@{$outreportarray[$x]},  "details of final construct after cloning (length: $templength bases):\n");
			push(@{$outreportarray[$x]},  "--------------------------------------------------------------\n\n");
		}

		my $string = "";
		my $insertcounter = 1;
		if ($cassette[4] ne "") {
			$string .= "$cassette[4],,";
		}
		if ($primerextension[$x][0][0] eq "TRUE") {
			$string .= "insert$insertcounter,,";
			$insertcounter++;
		}
		$string .= "$inputs[$x][0][1],,";
		if ($primerextension[$x][1][0] eq "TRUE") {
			$string .= "insert$insertcounter,,";
			$insertcounter++;
		}
		if ($cassette[4] ne "") {
			$string .= "$cassette[4]";
		}
		else {
			chop $string;
			chop $string;
		}
		$string .= "\n\n\n";
		push(@{$outreportarray[$x]}, "$string");
		
		# my $string = "";
		# if ($cassette[4] ne "") {
		# 	$string .= "$cassette[4],,";
		# }
		# $string .= "$inputs[$x][0][1]";
		# if ($cassette[4] ne "") {
		# 	$string .= ",,$cassette[4]";
		# }
		
		# push(@{$outreportarray[$x]}, "$string\n\n");
		
		for (my $pos = 0; $pos < length($final); $pos = $pos + 60) {
			my $string = $pos+1;
			for (my $i=length $pos; $i < 10; $i++) {
				$string .= " ";
			}
			$string .= substr($final, $pos, 60);
			push(@{$outreportarray[$x]}, "$string\n");
		}
		#close OUT;
		
		
		#printing output to fasta array
		
		
		@fastaoutarray;
		push(@{$fastaoutarray[$x]},  ">FW_$inputs[$x][0][1]_[Tm:$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]]\n$cassette[2]$primerextension[$x][0][1]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
		$primerextension[$x][1][1] = reverse $primerextension[$x][1][1];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		push(@{$fastaoutarray[$x]},  ">RV_$inputs[$x][$n-1][1]_[Tm:$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]]\n$cassette[3]$primerextension[$x][1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
		$primerextension[$x][1][1] = reverse $primerextension[$x][1][1];
		$primerextension[$x][1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		#close OUT;
	
	
	}
			
	
	
	###################################################################
	#####                MULTIPLE SEQUENCE INPUT                  #####
	###################################################################
	
	
	if ($n > 1) {

		
	
		###################################################################
		#Then calculation of GC ratio for each element. The results are 
		#saved as the fourth dimension of @TmGCrev and @TmGCfor (under 
		#array element [1])
		

		my @TmGCrev;
		my @TmGCfor;
		my ($TmGCrev_ref, $TmGCfor_ref) = &GCratiomulti(\@Afor, \@Tfor, \@Gfor, \@Cfor, \@Arev, \@Trev, \@Grev, \@Crev, \@brrev, \@brfor, $n);
		@TmGCrev = @$TmGCrev_ref;
		@TmGCfor = @$TmGCfor_ref;

		
		
		###################################################################
		#Since Tm is calculated for the binding region sequence + the part
		#of the fusion tail which also binds to the given sequence, two
		#arrays - @brforft and @brrevft - of sequences for Tm calculation 
		#are generated. They are simply copies of @brfor and @brrev with 
		#the addition of the ft part. For example, $brrevft[1][0][18] 
		#contains the reverse binding region of length 18+ft part for 
		#sequence 1.
		
		
		my @brrevft;
		my @brforft;
		for (my $i = 0; $i < $n; $i++) {
			for (my $iii = 18; $iii < 25; $iii++) {
				$brforft[$i][0][$iii] = $brfor[$i][0][$iii];
			}
			for (my $iii = 18; $iii < 25; $iii++) {
				$brrevft[$i][0][$iii] = $brrev[$i][0][$iii];
			}
		}
		
		my @revcompft;
		my @forft;
		for (my $i = 0; $i < $n-1; $i++) {
			$revcompft[$i] = $ft[$i];
			$revcompft[$i] =~ s/U/T/;
			$revcompft[$i] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			for (my $iii = 18; $iii < 25; $iii++) {
				$brrevft[$i][0][$iii] .= $revcompft[$i];
				# print "$i $iii rev $brrev[$i][0][$iii]\n";
			}
			$forft[$i] = $ft[$i];
			$forft[$i] =~ s/U/T/;
			for (my $iii = 18; $iii < 25; $iii++) {
				my $tempbr = $forft[$i];
				$tempbr .= $brforft[$i+1][0][$iii];
				$brforft[$i+1][0][$iii] = $tempbr;
				# print "$i $iii for $brfor[$i+1][0][$iii]\n";
			}
		}
		
		# @brrevft;
		# @brforft;
		# for (my $i = 0; $i < $n; $i++) {
		# 	for (my $iii = 18+$linker{$i}{2}; $iii < 25+$linker{$i}{2}; $iii++) {
		# 		$brforft[$i][0][$iii] = $brfor[$i][0][$iii];
		# 	}
		# 	for (my $iii = 18+$linker{$i+1}{2}; $iii < 25+$linker{$i+1}{2}; $iii++) {
		# 		$brrevft[$i][0][$iii] = $brrev[$i][0][$iii];
		# 	}
		# }
		
		# @revcompft;
		# @forft;
		# for (my $i = 0; $i < $n-1; $i++) {
		# 	$revcompft[$i] = $ft[$i];
		# 	$revcompft[$i] =~ s/U/T/;
		# 	$revcompft[$i] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		# 	for (my $iii = 18+$linker{$i+1}{2}; $iii < 25+$linker{$i+1}{2}; $iii++) {
		# 		$brrevft[$i][0][$iii] .= $revcompft[$i];
		# 	}
		# 	$forft[$i] = $ft[$i];
		# 	$forft[$i] =~ s/U/T/;
		# 	for (my $iii = 18+$linker{$i+1}{2}; $iii < 25+$linker{$i+1}{2}; $iii++) {
		# 		my $tempbr = $forft[$i];
		# 		$tempbr .= $brforft[$i+1][0][$iii];
		# 		$brforft[$i+1][0][$iii] = $tempbr;
		# 	}
		# }

		
		
		###################################################################
		#Then calculation of Tm using the nearest-neighbor method, The 
		#results are saved in the fourth dimension of @TmGCrev and @TmGCfor 
		#(under array element [0])
		

		my ($TmGCrev_ref, $TmGCfor_ref) = &Tm(\@brfor, \@brrev, \@TmGCfor, \@TmGCrev, $sc, $pc, $n);
		@TmGCrev = @$TmGCrev_ref;
		@TmGCfor = @$TmGCfor_ref;

		
		
		###################################################################
		#Then for the comparision and optimization of Tm of reverse and 
		#forward binding regions on the same DNA fragment
		#The optimal binding regions in terms of Tm. For a given DNA 
		#fragment, $i, the optimal choice for reverse and forward binding 
		#region (length) is saved in the array $optbr[$i][0][$ii] for 
		#reverse, and $optbr[$i][1][$ii] for forward (where $i is the gene 
		#entry, and $ii are the Tm matches).
		
		
		my $optbr_ref; 
		my $primerTmwarning_ref;
		my @optbr;
		my %primerTmwarning;
		
		if ($Tmtarget eq "") {
			($optbr_ref, $primerTmwarning_ref) = &optbr(\@TmGCrev, \@TmGCfor, $n);
			@optbr = @$optbr_ref;
			%primerTmwarning = %$primerTmwarning_ref;
		}
		
		elsif ($Tmtarget ne "") {
			($optbr_ref, $primerTmwarning_ref, $Tmtarget) = &optbrTm(\@TmGCrev, \@TmGCfor, $Tmtarget, $n);
			@optbr = @$optbr_ref;
			%primerTmwarning = %$primerTmwarning_ref;
		}
		
		
		
		###################################################################
		#Analyzing for risk of primer dimer formation. This is simply done 
		#by aligning the bases of each primer in a set from length 5 (the 
		#smallest dimer that can cause problems) to full alignment. If a 
		#primer dimer risk is detected, a flag is saved in the hash 
		#%primerdimer{$i}{$ii} where $i is the gene, and $ii is the number 
		#of the Tm match.
		

		my $primerdimer_ref = &primerdimer(\@brrev, \@brfor, \@optbr, \@TmGCfor, \@TmGCrev, $n, $sc, $pc);
		my %primerdimer = %$primerdimer_ref;
		
		
		
		###################################################################
		#Testing for intra-primer homology is done by aligning segments of 
		#4 bases with the rest of the primer sequence. 3 bases in each end 
		#of the 4 base segment are replace by "---" for the alignment, 
		#since "snap-backs" only occur if a small loop can be formed. If an 
		#intra-primer homology risk is detected, a flag is saved in the 
		#hash %homology{$i}{$ii} where $i is the gene, and $ii is the 
		#number of the Tm match.
		
		#print "hey\n";
		my ($homologyrev_ref, $homologyfor_ref) = &homology(\@brrev, \@brfor, \@optbr, \@TmGCfor, \@TmGCrev, $n, $sc, $pc);
		my %homologyrev = %$homologyrev_ref;
		my %homologyfor = %$homologyfor_ref;
		#print "hey\n";
		
		
		###################################################################
		#Testing for presence of GC clamp is done simply by checking for 
		#the presence of G's or C's at the 3' end of a primer 
					
		
		my ($GCclamprev_ref, $GCclampfor_ref) = &GCclamp(\@brrev, \@brfor, \@optbr, $n);
		my %GCclamprev = %$GCclamprev_ref;
		my %GCclampfor = %$GCclampfor_ref;
		
		
		
		###################################################################
		#Testing for risk of too strong binding, i.e. more than 3 G/C's in 
		#last 5 bases of 3' end
		
		
		my ($GCcountclamprev_ref, $GCcountclampfor_ref) = &GCcountclamp(\@brrev, \@brfor, \@optbr, $n);
		my %GCcountclamprev = %$GCcountclamprev_ref;
		my %GCcountclampfor = %$GCcountclampfor_ref;
		
		
		
		###################################################################
		#Testing for presence of poly N stretches. Poly is in this case 
		#defined as more than 4 dentical nucleotides in a row
		
		
		my ($polyNrev_ref, $polyNfor_ref) = &polyN(\@brrev, \@brfor, \@optbr, $n);
		my %polyNrev = %$polyNrev_ref;
		my %polyNfor = %$polyNfor_ref;
		
		
		
		###################################################################
		#Now that all putative primers are analysed for the above mentioned
		#parameters, it's time to select the most optimal primers. This is
		#done either by ranking by all parameters. If desired Tm is defined
		#by the user, this step is skipped, since there is no variability
		#in the primers
		
		my $ranking_ref;
		my %ranking;
		
		if ($Tmtarget eq "") {
			$ranking_ref = &optbranalysis(\@optbr, \@TmGCrev, \@TmGCfor, \%primerdimer, \%homologyrev, \%homologyfor, \%GCclamprev, \%GCclampfor, \%GCcountclamprev, \%GCcountclampfor, \%polyNrev, \%polyNfor, \%ranking, $n);
			%ranking = %$ranking_ref;
		}
		
		elsif ($Tmtarget ne "") {
			for (my $i = 0; $i < $n; $i++) {
				$ranking{$i}{0} = 0;
			}
		}
		
		
		
		###################################################################
		#####               PRINTING MULTISEQ RESULTS                 #####
		###################################################################
		
		


####CIRCULAR OUPUT		



		if ($circularoutput eq "TRUE") {
			for (my $i = 0; $i < $n; $i++) {
				for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
					$brrev[$i][0][$optbr[$i][0][$ii]] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				}
			}
			
			
			
			#First a quick overview of the needed primers is printed to the 
			#screen output report
			
			
			push(@{$outreportarray[$x]}, "--------------------------------------\n");
			push(@{$outreportarray[$x]}, "AMUSER $version\n");
			push(@{$outreportarray[$x]}, "output generated: $mday-$mon-$year $hour:$min:$sec\n");
			push(@{$outreportarray[$x]}, "--------------------------------------");
			push(@{$outreportarray[$x]}, "\n\n");
			push(@{$outreportarray[$x]}, "input parameters:\n");
			push(@{$outreportarray[$x]}, "-----------------\n");
			my $tempn = $n-1;
			push(@{$outreportarray[$x]}, "number of fragments: $inputcount[$x]\n");
			unless ($numberofinserts == 0) {
				push(@{$outreportarray[$x]}, "number of inserts: $numberofinserts\n");
			}
			if ($options{sc} ne "" or $options{pc} ne "") {
				my $tempsc = $sc * 1000;
				my $temppc = $pc * 1000000;
				push(@{$outreportarray[$x]}, "salt concentration selected: $tempsc nM\n");
				push(@{$outreportarray[$x]}, "primer concentration selected: $temppc uM\n");
			}
			if($Tmtarget ne "") {
				my $templine = "tm optimized to: $Tmtarget ";
				if ($options{tm} eq "eq") {
					$templine .= "C (all primer Tm approximated to each other)";
				}
				else {
					$templine .= "C (user defined)";
				}
				push(@{$outreportarray[$x]}, "$templine\n");
			}
			push(@{$outreportarray[$x]}, "$cassetteprint\n\n\n");
			push(@{$outreportarray[$x]}, "overview of the needed primers (5'-3'):\n");
			push(@{$outreportarray[$x]}, "---------------------------------------\n\n");
			push(@{$outreportarray[$x]}, "fragment\tstrand\ttm\tprimer\n");
			# print "$optbr[$n-1][1][0]\n$brfor[$n-1][0][$optbr[$n-1][1][0]]\n";
			# print "$n\n";
			push(@{$outreportarray[$x]}, "$inputs[$x][0][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{0}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{0}{0}]]\n");
			for (my $i = 0; $i < $n-2; $i++) {
				$ftcomp[$i] = reverse $ftcomp[$i];
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
				#print "$i $brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i}{0}]]\n";
				push(@{$outreportarray[$x]}, "$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
				push(@{$outreportarray[$x]}, "$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
				$ftcomp[$i] = reverse $ftcomp[$i];
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
			}
			$ftcomp[$n-2] = reverse $ftcomp[$n-2];
			$brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]] = reverse $brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]];
			$primerextension[$x][$n-2][5] = reverse $primerextension[$x][$n-2][5];
			push(@{$outreportarray[$x]}, "$inputs[$x][$n-2][1]\treverse\t$TmGCrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]][0]\C\t$ftcomp[$n-2]$primerextension[$x][$n-2][5]$brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]]\n\n");
			$ftcomp[$n-2] = reverse $ftcomp[$n-2];
			$brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]] = reverse $brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]];
			$primerextension[$x][$n-2][5] = reverse $primerextension[$x][$n-2][5];
			
			#If there is any warnings in the primer details section, the user is given a heads up:
			
			
			my $warningflag = 0;
			
			unless (55 < $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0] and 72 > $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]) {
				$warningflag = 1;
			}
			
			unless (39.9 < $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
				$warningflag = 1;
			}
			
			unless (exists $GCclampfor{0}{0}) {
				$warningflag = 1;
			}
			
			if (exists $GCcountclampfor{0}{0}) {
				$warningflag = 1;
			}
			
			if (exists $primerdimer{0}{0}) {
				$warningflag = 1;
			}
			
			if (exists $homologyfor{0}{0}) {
				$warningflag = 1;
			}	
			
			if (exists $polyNfor{0}{0}) {
				$warningflag = 1;
			} 
			
			for (my $i = 0; $i < $n-1; $i++) {
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				$ftcomp[$i] = reverse $ftcomp[$i];
				
				unless (55 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0] and 72 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]) {
					$warningflag = 1;
				}
				
				unless (39.9 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1] and 60.1 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1]) {
					$warningflag = 1;
				}
			
				unless (exists $GCclamprev{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $GCcountclamprev{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $primerdimer{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $homologyrev{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $polyNrev{$i}{0}) {
					$warningflag = 1;
				} 
				
				if (exists $primerTmwarning{$i}) {
					$warningflag = 1;
				}
				
				unless (55 < $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0] and 72 > $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]) {
					$warningflag = 1;
				}
				
				unless (39.9 < $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1] and 60.1 > $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]) {
					$warningflag = 1;
				}
			
				unless (exists $GCclampfor{$i+1}{0}) {
					$warningflag = 1;
				}
				
				if (exists $GCcountclampfor{$i+1}{0}) {
					$warningflag = 1;
				}
				
				if (exists $primerdimer{$i+1}{0}) {
					$warningflag = 1;
				}
				
				if (exists $homologyfor{$i+1}{0}) {
					$warningflag = 1;
				}	
				
				if (exists $polyNfor{$i+1}{0}) {
					$warningflag = 1;
				}		
			}
			
			$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
			unless (55 < $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0] and 72 > $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]) {
				$warningflag = 1;
			}
			
			unless (39.9 < $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1] and 60.1 > $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1]) {
				$warningflag = 1;
			}
			
			unless (exists $GCclamprev{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $GCcountclamprev{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $primerdimer{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $homologyrev{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $polyNfor{$n-1}{0}) {
				$warningflag = 1;
			} 
			
			if (exists $primerTmwarning{$n-1}) {
				$warningflag = 1;
			}
			
			if ($warningflag == 1) {
				push(@{$outreportarray[$x]},  "attention: one or more of the designed primers may have undesirable properties\n");
				push(@{$outreportarray[$x]},  "please see \"primer details\" section\n\n\n");
			}
			
			
			push(@{$outreportarray[$x]},  "overview of your final construct after cloning (circular):\n");
			push(@{$outreportarray[$x]},  "----------------------------------------------------------\n\n");
			
			#my $linkernumber = 1;
			my $string = "";
			my $insertcounter = 1;
			$string .= "$inputs[$x][0][1] (3' end),,";
			for (my $i = 1; $i < $n-1; $i++) {
				if ($primerextension[$x][$i][0] eq "TRUE") {
					$string .= "insert$insertcounter,,";
					$insertcounter++;
				}
				$string .= "$inputs[$x][$i][1],,";
			}
			if ($primerextension[$x][$n-1][0] eq "TRUE") {
				$string .= "insert$insertcounter,,";
			}
			$string .= "$inputs[$x][0][1] (5' end)";

			$string .= "\n\n\n";
			push(@{$outreportarray[$x]},  $string);
			
			#Then a graphic overview of the non-fusion tail, the fusion tail, and the binding region 
			#is printed to the screenout file
			
			
			
			my $cassetteftnoUpre = $cassette[2];
			$cassetteftnoUpre =~ tr/U/T/;
			my $cassetteftnoUpost = $cassette[3];
			$cassetteftnoUpost =~ tr/U/T/;
			$cassetteftnoUpost = reverse $cassetteftnoUpost;
			$cassetteftnoUpost =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			
			push(@{$outreportarray[$x]}, "graphic overview of DNA fragments and primers:\n");
			push(@{$outreportarray[$x]}, "----------------------------------------------\n\n");

			for (my $i = 0; $i < $n-1; $i++) {
				if ($n-1 == 1 and $i == 0) {
					push(@{$outreportarray[$x]},  "fusion region and related primers for joining of $inputs[$x][0][1] (3' end) and $inputs[$x][1][1] (5' end):\n\n");
				}
				else {
					push(@{$outreportarray[$x]},  "fusion region and related primers for joining of $inputs[$x][$i][1] and $inputs[$x][$i+1][1]:\n\n");
				}
				
				my $space = "";
				for (my $ii = 0; $ii < $Apos[$i][0]+5; $ii++) {
					$space .= " ";
				}
				my $temp = "$space";
				$temp .= "5'-$ft[$i]\n";
				push(@{$outreportarray[$x]},  "$temp");

				my $space = "";
				for (my $ii = 0; $ii < $Tpos[$i][0]+8; $ii++) {
					$space .= " ";
				}
				push(@{$outreportarray[$x]}, "$space$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]-3'\n");

				push(@{$outreportarray[$x]},  "5'-[...]$joined[$i]\[...]-3'\n");
				my $space = "";
###NB NB NB NB NB: This should be refined to check for existence of $primerextension throughout printing
#print length $primerextension[$x][$i][5], "\n";
				if ($Apos[$i][0] > (length $joined[$i])/2) {	
					for (my $ii = 0; $ii < ($Apos[$i][0]-$optbr[$i][0][$ranking{$i}{0}]-($Apos[$i][0]-(length $joined[$i])/2))+5; $ii++) {
						$space .= " ";
					}
				}
				else {
					for (my $ii = 0; $ii < $Apos[$i][0]-$optbr[$i][0][$ranking{$i}{0}]+5-length $primerextension[$x][$i][5]; $ii++) {
						$space .= " ";
					}
				}
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				my $temp = "$space";
				$temp .= "3'-$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n";
				push(@{$outreportarray[$x]},  "$temp");
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				my $space = "";
				for (my $ii = 0; $ii < $Apos[$i][0]+8-(length $primerextension[$x][$i][5]); $ii++) {
					$space .= " ";
				}
				$ftcomp[$i] = reverse $ftcomp[$i];
				push(@{$outreportarray[$x]},  "$space$primerextension[$x][$i][5]$ftcomp[$i]-5'\n");
				push(@{$outreportarray[$x]},  "\n");
				$ftcomp[$i] = reverse $ftcomp[$i];
			}
			
			push(@{$outreportarray[$x]},  "\n");	
			
			
			#Detailed descriptions of the primers are then printed to the screenout file
			
			
			push(@{$outreportarray[$x]},  "primer details:\n");
			push(@{$outreportarray[$x]},  "---------------\n\n");
			push(@{$outreportarray[$x]},  "primer details for $inputs[$x][0][1]\n\n");
			push(@{$outreportarray[$x]},  "forward primer: $ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			
			if (55 <= $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0] and 72 >= $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]) {
				push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
			}
			
			if (39.9 < $TmGCfor[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1] and 60.1 > $TmGCfor[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1]) {
				push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
			}
			
			if (exists $GCclampfor{$n-1}{0}) {
				push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
			}
			
			if (exists $GCcountclampfor{$n-1}{0}) {
				push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
			}
			
			if (exists $primerdimer{$n-1}{0}) {
				push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
			}
			
			if (exists $homologyfor{$n-1}{0}) {
				push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
			}	
			
			if (exists $polyNfor{$n-1}{0}) {
				push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
			} 
			push(@{$outreportarray[$x]},  "\n");

			$primerextension[$x][0][5] = reverse $primerextension[$x][0][5];
			push(@{$outreportarray[$x]},  "reverse primer: $ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
			$primerextension[$x][0][5] = reverse $primerextension[$x][0][5];
			if (55 <= $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0] and 72 >= $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]) {
				push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
			}
			
			if (39.9 < $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
				push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
			}
			
			if (exists $GCclampfor{0}{0}) {
				push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
			}
			
			if (exists $GCcountclampfor{0}{0}) {
				push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
			}
			
			if (exists $primerdimer{0}{0}) {
				push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
			}
			
			if (exists $homologyfor{0}{0}) {
				push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
			}	
			
			if (exists $polyNfor{0}{0}) {
				push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
			}
			else {
				push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
			} 
			push(@{$outreportarray[$x]},  "\n");
			
			if (exists $primerTmwarning{0}) {
				push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...NO\n");
			}
			else {
				push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...YES\n");
			}
			push(@{$outreportarray[$x]},  "\n");
			

			for (my $i = 0; $i < $n-2; $i++) {
				#$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				#$ftcomp[$i] = reverse $ftcomp[$i];
				
				push(@{$outreportarray[$x]},  "\nprimer details for $inputs[$x][$i+1][1]\n\n");
				push(@{$outreportarray[$x]},  "forward primer: $ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
				
				if (55 <= $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0] and 72 >= $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]) {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
				}
				
				if (39.9 < $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1] and 60.1 > $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]) {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
				}
			
				if (exists $GCclampfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
				}
				
				if (exists $GCcountclampfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
				}
				
				if (exists $primerdimer{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
				}
				
				if (exists $homologyfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
				}	
				
				if (exists $polyNfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
				}
				push(@{$outreportarray[$x]},  "\n");

				$primerextension[$x][$i+1][5] = reverse $primerextension[$x][$i+1][5];
				push(@{$outreportarray[$x]},  "reverse primer: $ftcomp[$i+1]$primerextension[$x][$i+1][5]$brrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]]\n");
				$primerextension[$x][$i+1][5] = reverse $primerextension[$x][$i+1][5];
	
				if (55 <= $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][0] and 72 >= $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][0]) {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
				}
				
				if (39.9 < $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][1] and 60.1 > $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][1]) {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[$i+1][0][$optbr[$i+1][0][$ranking{$i+1}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
				}
				
				if (exists $GCclampfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
				}
				
				if (exists $GCcountclampfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
				}
				
				if (exists $primerdimer{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
				}
				
				if (exists $homologyfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
				}	
				
				if (exists $polyNfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
				} 
				push(@{$outreportarray[$x]},  "\n");
				
				if (exists $primerTmwarning{$i+1}) {
					push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...NO\n");
				}
				else {
					push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...YES\n");
				}
			
				push(@{$outreportarray[$x]},  "\n");
				
			}
			
			push(@{$outreportarray[$x]},  "\n\n");
			
			#Lastly, the final construct is printed to the screenout for good meassures
			
			
			
			my $final .= $cassette[5];
			$final .= $cassetteftnoUpre;
			
			my $caseflag = 0;
			if ($cassette[5] eq "") {
				$caseflag = 1;
			}
	
			for (my $i = 0; $i < $n-1; $i++) {
				if ($primerextension[$x][$i][0] eq "TRUE") {
					if ($caseflag == 0) {
						$final .= lc $primerextension[$x][$i][1];
						$caseflag = 1;
					}
					elsif ($caseflag == 1) {
						$final .= uc $primerextension[$x][$i][1];
						$caseflag = 0;
					}
				}
				if ($caseflag == 0) {
					$final .= lc $inputs[$x][$i][2];
					$caseflag = 1;
				}
				elsif ($caseflag == 1) {
					$final .= uc $inputs[$x][$i][2];
					$caseflag = 0;
				}
			}
	
			if ($primerextension[$x][$n][0] eq "TRUE") {
				if ($caseflag == 0) {
					$final .= lc $primerextension[$x][$n][1];
					$caseflag = 1;
				}
				elsif ($caseflag == 1) {
					$final .= uc $primerextension[$x][$n][1];
					$caseflag = 0;
				}
			}

			if ($circularoutput eq "TRUE") {
				if ($primerextension[$x][$n-1][0] eq "TRUE") {
					if ($caseflag == 0) {
						$final .= lc $primerextension[$x][$n-1][1];
					}
					if ($caseflag == 1) {
						$final .= uc $primerextension[$x][$n-1][1];
					}
				}
			}
			
			if ($caseflag == 0) {
				$final .= lc $cassetteftnoUpost;
				$final .= lc $cassette[6];
			}
			elsif ($caseflag == 1) {
				$final .= uc $cassetteftnoUpost;
				$final .= uc $cassette[6];
			}
			
			my $templength = length($final);
	
			push(@{$outreportarray[$x]},  "details of final construct after cloning (circular, length: $templength bases):\n");
			push(@{$outreportarray[$x]},  "------------------------------------------------------------------------\n\n");
	

			my $string = "";
			my $insertcounter = 1;
			$string .= "$inputs[$x][0][1],,";
			for (my $i = 1; $i < $n-1; $i++) {
				if ($primerextension[$x][$i][0] eq "TRUE") {
					$string .= "insert$insertcounter,,";
					$insertcounter++;
				}
				$string .= "$inputs[$x][$i][1],,";
			}
			if ($primerextension[$x][$n-1][0] eq "TRUE") {
				$string .= "insert$insertcounter,,";
			}
			chop $string;
			chop $string;

			$string .= "\n\n\n";
			push(@{$outreportarray[$x]},  $string);
			
			
			for (my $pos = 0; $pos < length($final); $pos = $pos + 60) {
				my $string = $pos+1;
				for (my $i=length $pos; $i < 10; $i++) {
					$string .= " ";
				}
				$string .= substr($final, $pos, 60);
				push(@{$outreportarray[$x]}, "$string\n");
			}
			
			
			#printing output to fasta array
			
			if ($batchinput eq "TRUE") {

				# if ($x == 0) {
				# 	# push(@{$fastabatcharray[$x]}, "forward and reverse primers for backbone\n");
				# 	$primerextension[0][0][5] = reverse $primerextension[0][0][5];
				# 	# push(@{$fastabatcharray[$x]}, "$inputs[$x][0][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{0}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{0}{0}]]\n");
				# 	$primerextension[0][0][5] = reverse $primerextension[0][0][5];						
				# }

				for (my $i = 0; $i < $n-2; $i++) {
					#$ftcomp[$i] = reverse $ftcomp[$i];
					#$brrev[$i][0][$optbr[$i][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][$ranking{$i}{0}]];
					# push(@{$fastabatcharray[$x]}, "$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n\n");	
					push(@{$fastaoutarray[$x]},  "$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
					
				}
				$primerextension[$x][$n-2][5] = reverse $primerextension[$x][$n-2][5];
				push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-2][1]\treverse\t$TmGCrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]][0]\C\t$ftcomp[$n-2]$primerextension[$x][$n-2][5]$brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]]\n");	
				$primerextension[$x][$n-2][5] = reverse $primerextension[$x][$n-2][5];
			}
			else {
				#push(@{$fastaoutarray[$x]},  ">FW_$inputs[$x][0][1]_[Tm:$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]]\n$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
				push(@{$fastaoutarray[$x]},  ">FW_$inputs[$x][-1][1]_[Tm:$TmGCfor[-1][0][$optbr[-1][1][$ranking{-1}{0}]][0]]\n$ft[-1]$primerextension[$x][-1][4]$brfor[-1][0][$optbr[-1][1][$ranking{-1}{0}]]\n");
				for (my $i = 0; $i < $n-2; $i++) {
					#$ftcomp[$i] = reverse $ftcomp[$i];
					#$brrev[$i][0][$optbr[$i][0]] = reverse $brrev[$i][0][$optbr[$i][0]];
					$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
					push(@{$fastaoutarray[$x]},  ">RV_$inputs[$x][$i][1]_[Tm:$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]]\n$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");	
					$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
					push(@{$fastaoutarray[$x]},  ">FW_$inputs[$x][$i+1][1]_[Tm:$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]]\n$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
				}
				#$brrev[$n-1][0][$optbr[$n-1][0]] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				#$cassette[3] = reverse $cassette[3];
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				push(@{$fastaoutarray[$x]},  ">RV_$inputs[$x][$n-2][1]_[Tm:$TmGCrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]][0]]\n$ftcomp[$n-2]$primerextension[$x][$n-1][1]$brrev[$n-2][0][$optbr[$n-2][0][$ranking{$n-2}{0}]]\n");
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			}
		}





















	## NON-CIRCULAR MULTI OUTPUT PRINTING
	###################################################################



		else {
		#For the printing, all reverse primers must be complemented


			for (my $i = 0; $i < $n; $i++) {
				for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
					$brrev[$i][0][$optbr[$i][0][$ii]] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				}
			}
			
			
			
			#First a quick overview of the needed primers is printed to the 
			#screen output report
			
			push(@{$outreportarray[$x]}, "--------------------------------------\n");
			push(@{$outreportarray[$x]}, "AMUSER $version\n");
			push(@{$outreportarray[$x]}, "output generated: $mday-$mon-$year $hour:$min:$sec\n");
			push(@{$outreportarray[$x]}, "--------------------------------------");
			push(@{$outreportarray[$x]}, "\n\n");
			push(@{$outreportarray[$x]}, "input parameters:\n");
			push(@{$outreportarray[$x]}, "-----------------\n");
			push(@{$outreportarray[$x]}, "number of fragments: $inputcount[$x]\n");
			unless ($numberofinserts == 0) {
				push(@{$outreportarray[$x]}, "number of inserts: $numberofinserts\n");
			}
			if ($options{sc} ne "" or $options{pc} ne "") {
				my $tempsc = $sc * 1000;
				my $temppc = $pc * 1000000;
				push(@{$outreportarray[$x]}, "salt concentration selected: $tempsc nM\n");
				push(@{$outreportarray[$x]}, "primer concentration selected: $temppc uM\n");
			}
			if($Tmtarget ne "") {
				my $templine = "tm optimized to: $Tmtarget ";
				if ($options{tm} eq "eq") {
					$templine .= "C (all primer Tm approximated to each other)";
				}
				else {
					$templine .= "C (user defined)";
				}
				push(@{$outreportarray[$x]}, "$templine\n");
			}
			push(@{$outreportarray[$x]}, "$cassetteprint\n\n\n");
			push(@{$outreportarray[$x]}, "overview of the needed primers (5'-3'):\n");
			push(@{$outreportarray[$x]}, "---------------------------------------\n\n");
			push(@{$outreportarray[$x]}, "fragment\tstrand\ttm\tprimer\n");
			unless ($circularinput eq "TRUE") {
				push(@{$outreportarray[$x]}, "$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[$x][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
			}
			for (my $i = 0; $i < $n-1; $i++) {
				$ftcomp[$i] = reverse $ftcomp[$i];
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
				#print "$i $brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i}{0}]]\n";
				push(@{$outreportarray[$x]},  "$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
				push(@{$outreportarray[$x]},  "$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
				$ftcomp[$i] = reverse $ftcomp[$i];
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
			}
			unless ($circularinput eq "TRUE") {
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				push(@{$outreportarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n\n");
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			}
			if ($circularinput eq "TRUE") {	
				push(@{$outreportarray[$x]}, "\n");
			}
			
			
			#If there is any warnings in the primer details section, the user is given a heads up:
			
			
			my $warningflag = 0;
			
			unless (55 < $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0] and 72 > $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]) {
				$warningflag = 1;
			}
			
			unless (39.9 < $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
				$warningflag = 1;
			}
			
			unless (exists $GCclampfor{0}{0}) {
				$warningflag = 1;
			}
			
			if (exists $GCcountclampfor{0}{0}) {
				$warningflag = 1;
			}
			
			if (exists $primerdimer{0}{0}) {
				$warningflag = 1;
			}
			
			if (exists $homologyfor{0}{0}) {
				$warningflag = 1;
			}	
			
			if (exists $polyNfor{0}{0}) {
				$warningflag = 1;
			} 
			
			for (my $i = 0; $i < $n-1; $i++) {
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				$ftcomp[$i] = reverse $ftcomp[$i];
				
				unless (55 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0] and 72 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]) {
					$warningflag = 1;
				}
				
				unless (39.9 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1] and 60.1 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1]) {
					$warningflag = 1;
				}
			
				unless (exists $GCclamprev{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $GCcountclamprev{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $primerdimer{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $homologyrev{$i}{0}) {
					$warningflag = 1;
				}
				
				if (exists $polyNrev{$i}{0}) {
					$warningflag = 1;
				} 
				
				if (exists $primerTmwarning{$i}) {
					$warningflag = 1;
				}
				
				unless (55 < $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0] and 72 > $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]) {
					$warningflag = 1;
				}
				
				unless (39.9 < $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1] and 60.1 > $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]) {
					$warningflag = 1;
				}
			
				unless (exists $GCclampfor{$i+1}{0}) {
					$warningflag = 1;
				}
				
				if (exists $GCcountclampfor{$i+1}{0}) {
					$warningflag = 1;
				}
				
				if (exists $primerdimer{$i+1}{0}) {
					$warningflag = 1;
				}
				
				if (exists $homologyfor{$i+1}{0}) {
					$warningflag = 1;
				}	
				
				if (exists $polyNfor{$i+1}{0}) {
					$warningflag = 1;
				}		
			}
			
			$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
			unless (55 < $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0] and 72 > $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]) {
				$warningflag = 1;
			}
			
			unless (39.9 < $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1] and 60.1 > $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1]) {
				$warningflag = 1;
			}
			
			unless (exists $GCclamprev{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $GCcountclamprev{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $primerdimer{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $homologyrev{$n-1}{0}) {
				$warningflag = 1;
			}
			
			if (exists $polyNfor{$n-1}{0}) {
				$warningflag = 1;
			} 
			
			if (exists $primerTmwarning{$n-1}) {
				$warningflag = 1;
			}
			
			if ($warningflag == 1) {
				push(@{$outreportarray[$x]},  "attention: one or more of the designed primers may have undesirable properties\n");
				push(@{$outreportarray[$x]},  "please see \"primer details\" section\n\n\n");
			}
			
			push(@{$outreportarray[$x]},  "overview of your final construct after cloning:\n");
			push(@{$outreportarray[$x]},  "-----------------------------------------------\n\n");
			
			#my $linkernumber = 1;
			my $string = "";
			if ($cassette[4] ne "") {
				$string .= "$cassette[4],,";
			}
			my $insertcounter = 1;
			for (my $i = 0; $i < $n; $i++) {
				if ($primerextension[$x][$i][0] eq "TRUE") {
					$string .= "insert$insertcounter,,";
					$insertcounter++;
				}
				$string .= "$inputs[$x][$i][1],,";
			}
			if ($primerextension[$x][$n][0] eq "TRUE") {
				$string .= "insert$insertcounter,,";
				$insertcounter++;
			}
			if ($cassette[4] ne "") {
				$string .= "$cassette[4]";
			}
			else {
				chop $string;
				chop $string;
			}
			$string .= "\n\n\n";
			push(@{$outreportarray[$x]},  $string);
			
			#Then a graphic overview of the non-fusion tail, the fusion tail, and the binding region 
			#is printed to the screenout file
			
			
			
			my $cassetteftnoUpre = $cassette[2];
			$cassetteftnoUpre =~ tr/U/T/;
			my $cassetteftnoUpost = $cassette[3];
			$cassetteftnoUpost =~ tr/U/T/;
			$cassetteftnoUpost = reverse $cassetteftnoUpost;
			$cassetteftnoUpost =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			
			push(@{$outreportarray[$x]}, "graphic overview of DNA fragments and primers:\n");
			push(@{$outreportarray[$x]}, "----------------------------------------------\n\n");
			
			unless ($circularinput eq "TRUE") {
				if ($nocassette eq "TRUE") {
					push(@{$outreportarray[$x]}, "forward primer for $inputs[$x][0][1]:\n\n");
					push(@{$outreportarray[$x]}, "5'-$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]-3'\n");		
				}
			
				# else {
				# 	push(@{$outreportarray[$x]}, "fusion region and forward primer for joining of $cassette[4] and $inputs[$x][0][1]:\n\n");
				# 	my $space = "";
				# 	for (my $ii = 0; $ii < (length $cassette[2])+3+(length $cassette[5]); $ii++) {
				# 		$space .= " ";
				# 	}
				# 	push(@{$outreportarray[$x]}, "$space");
				# 	my $space = "";
				# 	push(@{$outreportarray[$x]}, "$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][0]]-3'\n");
				# 	for (my $ii = 0; $ii < (length $cassette[5]); $ii++) {
				# 		$space .= " ";
				# 	}
				# 	push(@{$outreportarray[$x]}, "$space");
				# 	push(@{$outreportarray[$x]}, "5'-$cassette[2]\n");
				# }
	
				else {
					push(@{$outreportarray[$x]}, "fusion region and forward primer for joining of $cassette[4] and $inputs[$x][0][1]:\n\n");
					my $space = "";
					for (my $ii = 0; $ii < (length $cassette[5]); $ii++) {
						$space .= " ";
					}
					push(@{$outreportarray[$x]}, "$space");
					push(@{$outreportarray[$x]}, "5'-$cassette[2]$primerextension[$x][0][4]\n");
					my $space = "";
					for (my $ii = 0; $ii < (length $cassette[2])+3+(length $cassette[5])+(length $primerextension[$x][0][1]); $ii++) {
						$space .= " ";
					}
					push(@{$outreportarray[$x]}, "$space$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]-3'\n");
		
				}				
				
				push(@{$outreportarray[$x]}, "5'-$cassette[5]$cassetteftnoUpre$primerextension[$x][0][4]$brickseqfrags[0][0]\[...]-3'\n\n");
			
			}
			for (my $i = 0; $i < $n-1; $i++) {
				push(@{$outreportarray[$x]},  "fusion region and related primers for joining of $inputs[$x][$i][1] and $inputs[$x][$i+1][1]:\n\n");
				
				my $space = "";
				for (my $ii = 0; $ii < $Apos[$i][0]+5; $ii++) {
					$space .= " ";
				}
				my $temp = "$space";
				$temp .= "5'-$ft[$i]\n";
				push(@{$outreportarray[$x]},  "$temp");

				my $space = "";
				for (my $ii = 0; $ii < $Tpos[$i][0]+8; $ii++) {
					$space .= " ";
				}
				push(@{$outreportarray[$x]}, "$space$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]-3'\n");				
				push(@{$outreportarray[$x]},  "5'-[...]$joined[$i]\[...]-3'\n");
				
				
				my $space = "";
###NB NB	 NB NB NB: This should be refined to check for existence of $primerextension throughout printing
				if ($Apos[$i][0] > (length $joined[$i])/2) {	
					for (my $ii = 0; $ii < ($Apos[$i][0]-$optbr[$i][0][$ranking{$i}{0}]-length $primerextension[$x][$i][5])+5; $ii++) {
						$space .= " ";
					}
				}
				else {
					for (my $ii = 0; $ii < $Apos[$i][0]-$optbr[$i][0][$ranking{$i}{0}]+5- length $primerextension[$x][$i][5]; $ii++) {
						$space .= " ";
					}
				}
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				my $temp = "$space";
				$temp .= "3'-$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]$primerextension[$x][$i][5]\n";
				push(@{$outreportarray[$x]},  "$temp");
				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				my $space = "";
				for (my $ii = 0; $ii < $Apos[$i][0]+8; $ii++) {
					$space .= " ";
				}
				$ftcomp[$i] = reverse $ftcomp[$i];
				push(@{$outreportarray[$x]},  "$space$ftcomp[$i]-5'\n");
				push(@{$outreportarray[$x]},  "\n");
				$ftcomp[$i] = reverse $ftcomp[$i];
			}
			
			unless ($circularinput eq "TRUE") {
				if ($nocassette eq "TRUE") {
					push(@{$outreportarray[$x]},  "reverse primer for $inputs[$x][$n-1][1]:\n\n");
					my $templine = "5'-[...]$brickseqfrags[$n-1][1]$primerextension[$x][$n][1]-3'";
					push(@{$outreportarray[$x]},  "$templine\n");
				}
				else {
					push(@{$outreportarray[$x]},  "fusion region and reverse primer for joining of $inputs[$x][$n-1][1] and $cassette[4]:\n\n");
					push(@{$outreportarray[$x]},  "5'-[...]$brickseqfrags[$n-1][1]$primerextension[$x][$n][1]$cassetteftnoUpost$cassette[6]-3'\n");
				}
					
				
				my $space = "";
				for (my $ii = 0; $ii < ((length $brickseqfrags[$n-1][1])+5)-(length $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]); $ii++) {
					$space .= " ";
				}
				my $templine = $space;
				
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				if ($nocassette eq "TRUE") {
					$templine .= "3'-$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]$primerextension[$x][$n][1]-5'";
					push(@{$outreportarray[$x]},  "$templine\n");
				}
				else {
					$templine .= "3'-$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]";
					push(@{$outreportarray[$x]},  "$templine\n");
				}
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
	
				if ($nocassette eq "FALSE") {
					my $space = "";
					for (my $ii = 0; $ii < (length $brickseqfrags[$n-1][1])+8; $ii++) {
						$space .= " ";
					}
					$cassette[3] = reverse $cassette[3];
					$primerextension[$x][$n-1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
					push(@{$outreportarray[$x]},  "$space$primerextension[$x][$n][1]$cassette[3]-5'");
					$cassette[3] = reverse $cassette[3];
					$primerextension[$x][$n-1][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				}
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			}

			push(@{$outreportarray[$x]},  "\n\n\n");	
			
			
			#Detailed descriptions of the primers are then printed to the screenout file
			
			
			push(@{$outreportarray[$x]},  "primer details:\n");
			push(@{$outreportarray[$x]},  "---------------\n\n");
			push(@{$outreportarray[$x]},  "primer details for $inputs[$x][0][1]\n\n");
			unless ($circularinput eq "TRUE") {
				push(@{$outreportarray[$x]},  "forward primer: $cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");

				if (55 <= $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0] and 72 >= $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]) {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
				}
				
				if (39.9 < $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
				}
				
				if (exists $GCclampfor{0}{0}) {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
				}
				
				if (exists $GCcountclampfor{0}{0}) {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
				}
				
				if (exists $primerdimer{0}{0}) {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
				}
				
				if (exists $homologyfor{0}{0}) {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
				}	
				
				if (exists $polyNfor{0}{0}) {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
				} 
				push(@{$outreportarray[$x]},  "\n");
			}
			
			for (my $i = 0; $i < $n-1; $i++) {
				#$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
				#$ftcomp[$i] = reverse $ftcomp[$i];
				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
				push(@{$outreportarray[$x]},  "reverse primer: $ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
	
				if (55 <= $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0] and 72 >= $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]) {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
				}
				
				if (39.9 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1] and 60.1 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1]) {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
				}
				
				if (exists $GCclampfor{$i}{0}) {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
				}
				
				if (exists $GCcountclampfor{$i}{0}) {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
				}
				
				if (exists $primerdimer{$i}{0}) {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
				}
				
				if (exists $homologyfor{$i}{0}) {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
				}	
				
				if (exists $polyNfor{$i}{0}) {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
				} 
				push(@{$outreportarray[$x]},  "\n");
				
				if (exists $primerTmwarning{$i}) {
					push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...NO\n");
				}
				else {
					push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...YES\n");
				}
			
				push(@{$outreportarray[$x]},  "\n");
				
				push(@{$outreportarray[$x]},  "\nprimer details for $inputs[$x][$i+1][1]\n\n");
				push(@{$outreportarray[$x]},  "forward primer: $ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
				
				if (55 <= $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0] and 72 >= $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]) {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
				}
				
				if (39.9 < $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1] and 60.1 > $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]) {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
				}
			
				if (exists $GCclampfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
				}
				
				if (exists $GCcountclampfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
				}
				
				if (exists $primerdimer{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
				}
				
				if (exists $homologyfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
				}	
				
				if (exists $polyNfor{$i+1}{0}) {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
				}
				push(@{$outreportarray[$x]},  "\n");
			}
			
			
			
			unless ($circularinput eq "TRUE") {
			#$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				push(@{$outreportarray[$x]},  "reverse primer: $cassette[3]$primerextension[$x][$n][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		
				if (55 <= $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0] and 72 >= $TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]) {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C - in optimal range (55-72)?                   ...YES\n");
				}										
				else {
					push(@{$outreportarray[$x]},  "* Tm: $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C - in optimal range (55-72)?                   ...NO\n");
				}
				
				if (39.9 < $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1] and 60.1 > $TmGCfor[0][0][$optbr[0][0][$ranking{0}{0}]][1]) {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1]\% - in optimal range (40-60)?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC content: $TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][1]\% - in optimal range (40-60)?          ...NO\n");
				}
				
				if (exists $GCclampfor{$n-1}{0}) {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* GC clamp present at 3' end?                             ...NO\n");
				}
				
				if (exists $GCcountclampfor{$n-1}{0}) {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* more than 3 G/C out of last 5 bases at 3' end?          ...NO\n");
				}
				
				if (exists $primerdimer{$n-1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of primer dimer formation in primer pair?          ...NO\n");
				}
				
				if (exists $homologyfor{$n-1}{0}) {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* risk of intra-primer homology (secondary structures)?   ...NO\n");
				}	
				
				if (exists $polyNfor{$n-1}{0}) {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...YES\n");
				}
				else {
					push(@{$outreportarray[$x]},  "* presence of polyN stretches?                            ...NO\n");
				}
				
				push(@{$outreportarray[$x]},  "\n");
			}
					
			if (exists $primerTmwarning{$n-1}) {
				push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...NO\n");
			}
			else {
				push(@{$outreportarray[$x]},  "Tm of primers within 2C of each other?                    ...YES\n");
			}
			push(@{$outreportarray[$x]},  "\n\n");

			
			#Lastly, the final construct is printed to the screenout for good meassures
			
			
			
			my $final .= $cassette[5];
			$final .= $cassetteftnoUpre;
			
			my $caseflag = 0;
			if ($cassette[5] eq "") {
				$caseflag = 1;
			}
	
			for (my $i = 0; $i < $n; $i++) {
				if ($primerextension[$x][$i][0] eq "TRUE") {
					if ($caseflag == 0) {
						$final .= lc $primerextension[$x][$i][1];
						$caseflag = 1;
					}
					elsif ($caseflag == 1) {
						$final .= uc $primerextension[$x][$i][1];
						$caseflag = 0;
					}
				}
				if ($caseflag == 0) {
					$final .= lc $inputs[$x][$i][2];
					$caseflag = 1;
				}
				elsif ($caseflag == 1) {
					$final .= uc $inputs[$x][$i][2];
					$caseflag = 0;
				}
			}
	
			if ($primerextension[$x][$n][0] eq "TRUE") {
				if ($caseflag == 0) {
					$final .= lc $primerextension[$x][$n][1];
					$caseflag = 1;
				}
				elsif ($caseflag == 1) {
					$final .= uc $primerextension[$x][$n][1];
					$caseflag = 0;
				}
			}
			
			if ($caseflag == 0) {
				$final .= lc $cassetteftnoUpost;
				$final .= lc $cassette[6];
			}
			elsif ($caseflag == 1) {
				$final .= uc $cassetteftnoUpost;
				$final .= uc $cassette[6];
			}
			
			my $templength = length($final);
	
			push(@{$outreportarray[$x]},  "details of final construct after cloning (length: $templength bases):\n");
			push(@{$outreportarray[$x]},  "--------------------------------------------------------------\n\n");
		
			
			# my $linkernumber = 1;
			my $string = "";
			if ($cassette[4] ne "") {
				$string .= "$cassette[4],,";
			}
			my $insertcounter = 1;
			for (my $i = 0; $i < $n; $i++) {
				if ($primerextension[$x][$i][0] eq "TRUE") {
					$string .= "insert$insertcounter,,";
					$insertcounter++;
				}
				$string .= "$inputs[$x][$i][1],,";
			}
			if ($primerextension[$x][$n][0] eq "TRUE") {
				$string .= "insert$insertcounter,,";
				$insertcounter++;
			}
			if ($cassette[4] ne "") {
				$string .= "$cassette[4]";
			}
			else {
				chop $string;
				chop $string;
			}
			$string .= "\n\n\n";
			push(@{$outreportarray[$x]},  $string);
			
			for (my $pos = 0; $pos < length($final); $pos = $pos + 60) {
				my $string = $pos+1;
				for (my $i=length $pos; $i < 10; $i++) {
					$string .= " ";
				}
				$string .= substr($final, $pos, 60);
				push(@{$outreportarray[$x]}, "$string\n");
			}
			close OUT;
			
			#printing output to fasta array

			# if ($batchinput eq "TRUE") {
			# 	if ($circularoutput eq "TRUE") {
			# 		if ($x == 0) {
			# 			push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
			# 			push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");	
			# 		}
	
			# 		for (my $i = 1; $i < $n-1; $i++) {
			# 			my $insertno = $x+1;
			# 			$ftcomp[$i] = reverse $ftcomp[$i];
			# 			$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
			# 			$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];												  
			# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\tforward\t$TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i][4]$brfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]]\n");
			# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
			# 			$ftcomp[$i] = reverse $ftcomp[$i];
			# 			$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
			# 			$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];	
			# 		}
					
			# 		#double backbone
			# 		if ($backbone == 1 and $x == $numberofbatches-1) {
			# 			                                    #"$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n"
			# 			push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[0][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 			# push(@{$fastabatcharray[$x]}, "$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 			$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
			# 			# push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$ftcomp[$n-1]$primerextension[$x][$n-1][5]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");	
			# 			$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
			# 		}

			# 		#single backbone, front
			# 		elsif ($backbone == 2 and $x == $numberofbatches-1) {
			# 			my $insertno = $x+1;
			# 			                                    #"$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n"
			# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[0][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 			# push(@{$fastabatcharray[$x]}, "$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 			$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
			# 			# push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$ftcomp[$n-1]$primerextension[$x][$n-1][5]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");	
			# 			$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
			# 		}

			# 		#single backbone, back
			# 	}
				
			# 	if ($circularoutput ne "TRUE") {
			# 		unless ($backbone == 3) {
			# 			if ($x == 0) {
			# 				push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
			# 				push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");	
			# 			}
			# 		}
					
			# 		if ($backbone == 1) {
			# 			for (my $i = 1; $i < $n-1; $i++) {
			# 				my $insertno = $x+1;
			# 				$ftcomp[$i] = reverse $ftcomp[$i];
			# 				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
			# 				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];												  
			# 				push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\tforward\t$TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i][4]$brfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]]\n");
			# 				push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
			# 				$ftcomp[$i] = reverse $ftcomp[$i];
			# 				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
			# 				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];	
			# 			}
			# 		}

			# 		if ($backbone == 2) {
			# 			for (my $i = 0; $i < $n-1; $i++) {
			# 				my $insertno = $x+1;
			# 				$ftcomp[$i] = reverse $ftcomp[$i];
			# 				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
			# 				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];												  
			# 				push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\tforward\t$TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i][4]$brfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]]\n");
			# 				push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
			# 				$ftcomp[$i] = reverse $ftcomp[$i];
			# 				$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
			# 				$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];	
			# 			}
			# 		}

			# 		if ($x == $numberofbatches-1) {
			# 			if ($backbone == 1 or $backbone == 3) {
			# 				push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 				push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n-1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
			# 			}
			# 		}
			# 		# elsif ($backbone == 1 and $x == $numberofbatches-1) {
			# 		# 	my $insertno = $x+1;
			# 		# 	                                    #"$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n"
			# 		# 	push(@fastabatcharray, "insert $insertno\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[0][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 		# 	# push(@{$fastabatcharray[$x]}, "$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
			# 		# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
			# 		# 	# push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$ftcomp[$n-1]$primerextension[$x][$n-1][5]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");	
			# 		# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
			# 		# }
			# 	}
			# }
			
			if ($batchinput ne "TRUE") {
				push(@{$fastaoutarray[$x]},  ">FW_$inputs[$x][0][1]_[Tm:$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]]\n$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
				for (my $i = 0; $i < $n-1; $i++) {
					#$ftcomp[$i] = reverse $ftcomp[$i];
					#$brrev[$i][0][$optbr[$i][0]] = reverse $brrev[$i][0][$optbr[$i][0]];
					$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
					push(@{$fastaoutarray[$x]},  ">RV_$inputs[$x][$i][1]_[Tm:$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]]\n$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");	
					$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];
					push(@{$fastaoutarray[$x]},  ">FW_$inputs[$x][$i+1][1]_[Tm:$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]]\n$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n");
				}
				#$brrev[$n-1][0][$optbr[$n-1][0]] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				#$cassette[3] = reverse $cassette[3];
				$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]] = reverse $brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]];
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				push(@{$fastaoutarray[$x]},  ">RV_$inputs[$x][$n-1][1]_[Tm:$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]]\n$cassette[3]$primerextension[$x][$n][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
				$primerextension[$x][$n][1] = reverse $primerextension[$x][$n][1];
				$primerextension[$x][$n][1] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			
				push (@batchoutput, @fastaoutarray);
			}
		}



##### BATCH PRINTING
		if ($batchinput eq "TRUE") {
			if ($circularoutput eq "TRUE") {
				if ($backbone == 1) {
					# backbone on front and back of combinatorial input Z+XY+Z

					die "sorry, when circular assembly is selected, only input in the following format is currently available in AMUSER: \"back bone\"+\"frament 1\" \"fragment n\"+. More options to be added soon\n";

					if ($x == 0) {
						my $insertno = 1;
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$ft[1]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
						
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}
					if ($x > 0 and $x < $numberofbatches) {
						my $insertno = $x+1;
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}
					if ($x == $numberofbatches-1) {
						push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	 					push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n-1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
					}
				}
				elsif ($backbone == 2) {
					# only front backbone is present Z+XY+

					if ($x == 0) {
						my $insertno = 1;
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$ft[1]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
						
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}
					if ($x > 0 and $x < $numberofbatches) {
						my $insertno = $x+1;
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}									
				}		
				elsif ($backbone == 3) {

					die "sorry, when circular assembly is selected, only input in the following format is currently available in AMUSER: \"back bone\"+\"frament 1\" \"fragment n\"+. More options to be added soon\n";

					# only back backbone is present +XY+Z
					if ($x >= 0 and $x < $numberofbatches) {
						my $insertno = $x+1;
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][0][1]\tforward\t$TmGCfor[1][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$ft[1]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][0][1]\treverse\t$TmGCrev[1][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
					}
					if ($x == $numberofbatches-1) {
						push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	 					push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n-1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
					}
				}
			}


			elsif ($circularoutput ne "TRUE") {
				if ($backbone == 1) {
					# backbone on front and back of combinatorial input Z+XY+Z
					if ($x == 0) {
						my $insertno = 1;
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
						
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}
					if ($x > 0 and $x < $numberofbatches) {
						my $insertno = $x+1;
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}
					if ($x == $numberofbatches-1) {
						push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	 					push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n-1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
					}
				}
				elsif ($backbone == 2) {
					# only front backbone is present Z+XY+
					if ($x == 0) {
						my $insertno = 1;
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
						push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
						
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}
					if ($x > 0 and $x < $numberofbatches) {
						my $insertno = $x+1;
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\tforward\t$TmGCfor[1][0][$optbr[1][1][$ranking{1}{0}]][0]\C\t$ft[0]$primerextension[$x][1][4]$brfor[1][0][$optbr[1][1][$ranking{1}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][1][1]\treverse\t$TmGCrev[1][0][$optbr[1][0][$ranking{1}{0}]][0]\C\t$ftcomp[1]$primerextension[$x][1][5]$brrev[1][0][$optbr[1][0][$ranking{1}{0}]]\n");
					}									
				}		
				elsif ($backbone == 3) {
					# only back backbone is present +XY+Z
					if ($x >= 0 and $x < $numberofbatches) {
						my $insertno = $x+1;
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][0][1]\tforward\t$TmGCfor[1][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$ft[1]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
						push(@fastabatcharray, "insert $insertno\t$inputs[$x][0][1]\treverse\t$TmGCrev[1][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");
					}
					if ($x == $numberofbatches-1) {
						push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	 					push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n-1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
					}
				}
			}
		}
	}
}



		# for (my $i = 1; $i < $n-1; $i++) {
		# 	my $insertno = $x+1;
		# 	$ftcomp[$i] = reverse $ftcomp[$i];
		# 	$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
		# 	$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];												  
		# 	push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\tforward\t$TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i][4]$brfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]]\n");
		# 	push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
		# 	$ftcomp[$i] = reverse $ftcomp[$i];
		# 	$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
		# 	$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];	
		# }
		
		# #double backbone
		# if ($backbone == 1 and $x == $numberofbatches-1) {
		# 	                                    #"$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n"
		# 	push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[0][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
		# 	# push(@{$fastabatcharray[$x]}, "$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
		# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
		# 	# push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$ftcomp[$n-1]$primerextension[$x][$n-1][5]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");	
		# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
	
		# #single backbone, front
		# elsif ($backbone == 2 and $x == $numberofbatches-1) {
		# 	my $insertno = $x+1;
		# 	                                    #"$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n"
		# 	push(@fastabatcharray, "insert $insertno\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[0][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
		# 	# push(@{$fastabatcharray[$x]}, "$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
		# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
		# 	# push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$ftcomp[$n-1]$primerextension[$x][$n-1][5]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");	
		# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
	
		# #single backbone, back
	# }
	
	# if ($circularoutput ne "TRUE") {
	# 	unless ($backbone == 3) {
	# 		if ($x == 0) {
	# 			push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\tforward\t$TmGCfor[0][0][$optbr[0][1][$ranking{0}{0}]][0]\C\t$cassette[2]$primerextension[$x][0][4]$brfor[0][0][$optbr[0][1][$ranking{0}{0}]]\n");
	# 			push(@fastabatcharray, "5' backbone\t$inputs[$x][0][1]\treverse\t$TmGCrev[0][0][$optbr[0][0][$ranking{0}{0}]][0]\C\t$ftcomp[0]$primerextension[$x][0][5]$brrev[0][0][$optbr[0][0][$ranking{0}{0}]]\n");	
	# 		}
	# 	}
		
	# 	if ($backbone == 1) {
	# 		for (my $i = 1; $i < $n-1; $i++) {
	# 			my $insertno = $x+1;
	# 			$ftcomp[$i] = reverse $ftcomp[$i];
	# 			$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
	# 			$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];												  
	# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\tforward\t$TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i][4]$brfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]]\n");
	# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
	# 			$ftcomp[$i] = reverse $ftcomp[$i];
	# 			$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
	# 			$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];	
	# 		}
	
	# 	if ($backbone == 2) {
	# 		for (my $i = 0; $i < $n-1; $i++) {
	# 			my $insertno = $x+1;
	# 			$ftcomp[$i] = reverse $ftcomp[$i];
	# 			$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
	# 			$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];												  
	# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\tforward\t$TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i][4]$brfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]]\n");
	# 			push(@fastabatcharray, "insert $insertno\t$inputs[$x][$i][1]\treverse\t$TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][0]\C\t$ftcomp[$i]$primerextension[$x][$i][5]$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]]\n");
	# 			$ftcomp[$i] = reverse $ftcomp[$i];
	# 			$brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]] = reverse $brrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]];
	# 			$primerextension[$x][$i][5] = reverse $primerextension[$x][$i][5];	
	# 		}
	
	# 	if ($x == $numberofbatches-1) {
	# 		if ($backbone == 1 or $backbone == 3) {
	# 			push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-2]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	# 			push(@fastabatcharray, "3' backbone\t$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$cassette[3]$primerextension[$x][$n-1][1]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");
	# 		}
	# 	}
	# 	# elsif ($backbone == 1 and $x == $numberofbatches-1) {
	# 	# 	my $insertno = $x+1;
	# 	# 	                                    #"$inputs[$x][$i+1][1]\tforward\t$TmGCfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]][0]\C\t$ft[$i]$primerextension[$x][$i+1][4]$brfor[$i+1][0][$optbr[$i+1][1][$ranking{$i+1}{0}]]\n"
	# 	# 	push(@fastabatcharray, "insert $insertno\t$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[0][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	# 	# 	# push(@{$fastabatcharray[$x]}, "$inputs[$x][$n-1][1]\tforward\t$TmGCfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]][0]\C\t$ft[$n-1]$primerextension[$x][$n-1][4]$brfor[$n-1][0][$optbr[$n-1][1][$ranking{$n-1}{0}]]\n");
	# 	# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
	# 	# 	# push(@{$fastaoutarray[$x]},  "$inputs[$x][$n-1][1]\treverse\t$TmGCrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]][0]\C\t$ftcomp[$n-1]$primerextension[$x][$n-1][5]$brrev[$n-1][0][$optbr[$n-1][0][$ranking{$n-1}{0}]]\n");	
	# 	# 	$primerextension[$x][$n-1][5] = reverse $primerextension[$x][$n-1][5];
	# 	# }
	# }
# }



###################################################################
#####           HTML FORMATTING AND FILE PRINTING             #####
###################################################################


# MAKE INPUT OPTIONS FOR PRINT OUT, PRINT STDOUT, OR BOTH


if ($batchinput eq "FALSE") {
	if ($options{r} ne "") {
		open (OUT, '>', $outreport);
		print OUTFRED "-r txt report: $outreport\n";
		for (my $i = 0; $i < scalar @{$outreportarray[0]}; $i++) {
			print OUT "$outreportarray[0][$i]";
		}
		close OUT;
	}
	
	if ($options{o} ne "") {
		open (OUT, '>', $fastaout);
		print OUTFRED "-o fsa report: $fastaout\n";
		for (my $i = 0; $i < scalar @{$fastaoutarray[0]}; $i++) {
			print OUT "$fastaoutarray[0][$i]";
		}
		close OUT;
	}	
	
	my $htmlarray_ref = &htmlprint(\@outreportarray, \@fastaoutarray, $batchinput);
	my @htmlarray = @$htmlarray_ref;
	
	if ($options{h} ne "") {
		open (OUT, '>', $htmlreport);
		print OUTFRED "-h html report: $htmlreport\n";
		for (my $i = 0; $i < scalar @{$htmlarray[0]}; $i++) {
			print OUT "$htmlarray[0][$i]";
		}
		close OUT;
	}
	else {
		for (my $i = 0; $i < scalar @{$htmlarray[0]}; $i++) {
			print "$htmlarray[0][$i]";
		}
	}
}

elsif ($batchinput eq "TRUE") {
	for (my $x = 0; $x < scalar @inputs; $x++) {
		if ($options{r} ne "") {
			if ($options{workdir} ne "") {
				my $filename = $outputpath;
				$filename .= "batch$x.$outreportshort";
				open (OUT, '>', "$filename");
				print OUTFRED "-workdir + batch outreport: $outputpath/batch$x.$outreportshort\n";
			}
			else {
				open (OUT, '>', "batch$x.$outreportshort");
				print OUTFRED "batch outreport: batch$x.$outreportshort\n";
			}
	
			for (my $i = 0; $i < scalar @{$outreportarray[$x]}; $i++) {
				print OUT "$outreportarray[$x][$i]";
			}
			close OUT;
		}
		
		if ($options{o} ne "") {
			if ($options{workdir} ne "") {
				my $filename = $outputpath;
				$filename .= "batch$x.$fastaoutshort";
				open (OUT, '>', "$filename");
				print OUTFRED "-workdir + batch fsa: $outputpath/batch$x.$fastaoutshort\n";
			}
			else {
				open (OUT, '>', "batch$x.$fastaout");
				print OUTFRED "batch fsa: batch$x.$fastaoutshort\n";
			}
			for (my $i = 0; $i < scalar @{$fastaoutarray[$x]}; $i++) {
				print OUT "$fastaoutarray[$x][$i]";
			}
			close OUT;
		}
	}
	# for (my $p = 0; $p < scalar @fastabatcharray; $p++) {
	# 	print "\n$fastabatcharray[$p]\n";
	# }
	my $htmlarray_ref = &htmlprintbatch(\@fastaoutarray, \@fastabatcharray);
	my @htmlarray = @$htmlarray_ref;		
	
	if ($options{h} ne "") {

		open (OUT, '>', $htmlreport);
		print OUTFRED "-h html report: $htmlreport\n";
		for (my $i = 0; $i < scalar @htmlarray; $i++) {
			print OUT "$htmlarray[$i]";
		}
		close OUT;

		for (my $x = 0; $x < $numberofinputs; $x++) {
			my $htmlarray_batch_ref = &htmlprint(\@outreportarray, \@fastaoutarray, $batchinput, $x);
			my @htmlarray_batch = @$htmlarray_batch_ref;
			my $filename = $outputpath;
			$filename .= "batch$x.$htmlreportshort";
			open (OUT, '>', "$filename");
			print OUTFRED "-h + batch html: $filename\n";
			for (my $i = 0; $i < scalar @{$htmlarray_batch[$x]}; $i++) {
				print OUT "$htmlarray_batch[$x][$i]";
			}
			close OUT;
		}
	}
	else {
		for (my $i = 0; $i < scalar @htmlarray; $i++) {
			print "$htmlarray[$i]";
		}
	}	
}



###################################################################
##one last line break in debug messages for good measures
if ($verbose eq "TRUE") {
	print "\n";
} 



###################################################################
#####                       SUBROUTINES                       #####
###################################################################
				
				
sub cassettenickandrestr {

    my %options = %{$_[0]};
    my %restrictionsites = %{$_[1]};
    my %nickingsites = %{$_[2]};
    my $db1 = ${$_[3]};
    my $db2 = ${$_[4]};

	unless (exists $nickingsites{$options{cnick}}) {
		die "ERROR: unknown nicking input option: \"$options{cnick}\"\n";
	}
	unless (exists $restrictionsites{$options{crestr}}) {
		die "ERROR: unknown restriction input option: \"$options{crestr}\"\n";
	}
	if ($db1 eq "" or $db2 eq "" or $db1 =~ m/[^ATGC]/ or $db2 =~ m/[^ATGC]/) {
		die "ERROR: please enter valid directional bases\n";
	}
	
	my $tempfor;
	my $temprev;
	my $nickpos = 0;
	my $restrpos = 0;
	my $temp;
	
	$tempfor = $nickingsites{$options{cnick}};
	$tempfor =~ s/\.//;
	$tempfor .= "$db1";
	$tempfor .= $restrictionsites{$options{crestr}};
	$tempfor .= "$db2";
	$temp = reverse $nickingsites{$options{cnick}};
	$temp =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
	$tempfor .= $temp;
	$cassette[0] = $tempfor;
	
	$temprev = $nickingsites{$options{cnick}};
	$temprev =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
	$temprev .= "$db2";
	$temp = $restrictionsites{$options{crestr}};
	$temp = reverse $temp;
	$temprev .= $temp;
	$temprev .= "$db1";
	$temp = reverse $nickingsites{$options{cnick}};
	$temp =~ s/\.//;
	$temprev .= $temp;
	$cassette[1] = $temprev;

	while (substr($cassette[1], $nickpos, 1) ne ".") {
		$nickpos++;
	}
	
	while (substr($cassette[0], $restrpos, 1) ne ".") {
		$restrpos++;
	}
	
	$cassette[2] = substr($cassette[0], $nickpos, $restrpos-$nickpos-1);
	$cassette[2] .= "U";

	$temprev = reverse $cassette[1];

	$cassette[3] = substr($temprev, $nickpos, $restrpos-$nickpos-1);
	$cassette[3] .= "U";
	
	$cassette[4] = "$options{crestr}/$options{cnick}";

	$cassette[5] = substr($cassette[0], 0, $nickpos);
	$cassette[6] = reverse $cassette[5];
	$cassette[6] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
	
	return \@cassette;
}


sub cassettemanin {

	my %options = %{@_[0]};
	my @cassette = @{@_[1]};

	my $nickpos = 0;
	my $restrpos = 0;
	my $temprev;
	
	$cassette[0] = uc $options{cmaninfor};
	$cassette[1] = uc $options{cmaninrev};
	
	if ($cassette[0] =~ m/[^ATGC.]/g or $cassette[0] !~ m/.*\..+\./g) {
		die "ERROR: unknown custom forward cassette input option: \"$options{cmaninfor}\"\n";
	}

	if ($cassette[1] =~ m/[^ATGC.]/g or $cassette[1] !~ m/.*\..+\./g) {
		die "ERROR: unknown custom reverse cassette input option: \"$options{cmaninrev}\"\n";
	}


	if ($options{cname} ne "") {
		$cassette[4] = $options{cname};
	}
	elsif ($cassette[4] eq "") {
		$cassette[4] = "custom cassette";
	}

	while (substr($cassette[1], $nickpos, 1) ne ".") {
		$nickpos++;
	}
	
	while (substr($cassette[0], $restrpos, 1) ne ".") {
		$restrpos++;
	}
	
	$cassette[2] = substr($cassette[0], $nickpos, $restrpos-$nickpos-1);
	$cassette[2] .= "U";

	$temprev = reverse $cassette[1];

	$cassette[3] = substr($temprev, $nickpos, $restrpos-$nickpos-1);
	$cassette[3] .= "U";

	$cassette[5] = substr($cassette[0], 0, $nickpos);
	$cassette[6] = reverse $cassette[5];
	$cassette[6] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
	
	return \@cassette;
}



sub inputfile {
	# print "Entering sub inputfile\n" if ($debug eq "TRUE");
	###
	# Input file handeling
	###

	# Patch 2014.01.08 Boston, Jakob:
	my $backbone = 0; 
	# 0 =  uninitialized, 1 = front and back, 2 = only front, 3 = only back, 4 = none


	my $inputfasta = $_[0];
	my $circular_dna = $_[1];
	my $fasta_count = 0;
	my $fasta_header_in_input = 0;
	my $no = 0;
	my $batchinput = "FALSE";
	my $flag_for_varying_fasta = "FALSE";
	my $flag_long_insert = 0;
	my $end_insert;
	my @splittype;
	## splittype [fasta count][0] identifyer of which input number we came from
	## splittype [fasta count][1] identifyer: 2=not touched; 1=parted; 0=inserted
	my @input;
	my @namecount;
	my @partcount;
	my $name_i=-1;
	#my $inputcount[0] = 0;
	my $namepatch;
	my $flag_first;
	my $prev_length = 0;	
	my $cur_do_not_cross = 0;
	my $prev_do_not_cross = 0;
	my $cur_name;
	my @array_of_names;
	
	# read into variables

	open (IN, '<', $inputfasta) or die "ERROR: you have entered invalid filename(s): $!";
	my $line = <IN>;
	
	# Patch 2014.01.08 Boston, Jakob:
	my $lastline = 'void';

	if($line=~m/\+/){
		$backbone = 3;
	}else{
		$backbone = 1;
	}

	# LOOP
	while (defined $line){
		$line =~ tr/\r/\n/; # translitterate makes carrrige return to newlines
		chomp($line);
		# &sanity_check_line($line);
		# Skip empty lines in input
		if ($line =~ m/^\s*$/){
			# Patch 2014.01.08 Boston, Jakob:
			$lastline = $line;

			$line = <IN>;

		# save name if line starts with >
		} elsif ( $line =~ m/^>(.*)/ ){
			push (@array_of_names,$1);
			$flag_first = 1;
			$name_i++;
			$inputcount[0]++;
			# "$no" is a number to determine if input is a part of combinatorial input.
			$cur_name = $1;
			if ($flag_for_varying_fasta eq "FALSE"){
				$no=0;
			} else {
				$no++;
				$cur_do_not_cross++;
			}
			$input[$fasta_count][0] = $no;
			$input[$fasta_count][1] = $1;

			# Patch 2014.01.08 Boston, Jakob:
			$lastline = $line;

			# Raise flag if input contains fasta header
			$fasta_header_in_input = 1;

			$line = <IN>;

		# change state of flag if line starts with +
		} elsif ( $line =~ m/^\+(.*)$/ ){
			$cur_do_not_cross++;
			$batchinput = "TRUE";
			if ($flag_for_varying_fasta eq "FALSE") {
				$flag_for_varying_fasta = "TRUE";
			} else {
				$flag_for_varying_fasta = "FALSE";
				$no=0;
			}
			# Patch 2014.01.08 Boston, Jakob:
			$lastline = $line;

			$line = <IN>;
		}

		# if neither line starts with > nor + DNA in fasta is assumed, 
		### Now we check if the DNA should be modified, that is the case if we have squared brackets present.
		else {
			# all DNA will be concatenated into $string
			my $string;
			while (defined $line and ($line =~ m/^[>\+]/) == 0 ){
				$line =~ tr/\r/\n/; # translitterate makes carrrige return to newlines
				chomp($line);
				$line =~ s/\s//g;			#removing all whitespace
				$string .= uc($line);		#converting DNA to uppercase

				# Patch 2014.01.08 Boston, Jakob:
				$lastline = $line;

				$line = <IN>;
			}

			if ($fasta_header_in_input == 0 and $batchinput eq "FALSE") {
				die "Error: no fasta input detected. AMUSER accepts only fasta inputs. Please check input\n";
			}
		#	my $fragment_no=0;
		#	my $insertion_no=0;
		#	&sanity_check_string($string);
	
		# check id the DNA contains an equal sign: = 
		# in this case, DNA must be split up according to rules
			if ($string =~ m/=/){
				while ($string =~m/^(.*?)\[(.*?)=(.*?)\](.*)$/){
					my ($dollar1,$dollar2,$dollar3,$dollar4) = ($1,$2,$3,$4);
					my ($length1,$length2,$length3,$length4) = (length($dollar1),length($dollar2),length($dollar3),length($dollar4));
					
					#Pseudo Algorithm

					#a + may not have been crossed
					# if varyig fasta flag is up, a > must not have been crossed
					#we are not supposed to merge strings to inserts
					if ($length1 > 0){
						if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and ($length1 + $prev_length) < 80){
						#we are okay to merge strings of short length to inserts
							$input[$fasta_count-1][2] .= $dollar1; #string
						} else {
							if ($length1 < 80){
								$splittype[$fasta_count][0] = 0; # type 0 = insert
							}else{
								$splittype[$fasta_count][0] = 1; # type 1 = part x of y
								if (defined $partcount[$name_i]){
									$partcount[$name_i] += 1;
								} else {
									$partcount[$name_i] = 1;
								}
							}
							$input[$fasta_count][0] = $no; 
							$input[$fasta_count][1] = $cur_name;
							$input[$fasta_count][2] = $dollar1; #string
							$splittype[$fasta_count][1] = $name_i;
							$fasta_count++;
						}
						$string = "[=$dollar3]$dollar4";
					}elsif($length3 > 0){
						if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and ($length3 + $prev_length) < 80){
						#we are okay to merge strings of short length to inserts
							$input[$fasta_count-1][2] .= $dollar3; #string
						} else {
							if ($length3 < 80){
								$splittype[$fasta_count][0] = 0; # type 0 = insert
							}else{
								#WARNING LONG INSERT
								$flag_long_insert = 1;
								$splittype[$fasta_count][0] = 1; # type 1 = part x of y
							}
							$input[$fasta_count][0] = $no; 
							$input[$fasta_count][1] = $cur_name;
							$input[$fasta_count][2] = $dollar3; #string
							$splittype[$fasta_count][1] = $name_i;
							$fasta_count++;
						}
						$string = $dollar4;
					}else{
						$string = $dollar4;
					}
				

					# if previous string is short (<80) and this one is as well, they can be merged as an insert

					# if length1 != 0 dollar1 is saved
					# dollar3 and 4 are put into string
					# else if length3 !=0 length3 is saved
					#dollar4 is put into string.
					
					$flag_first = 0;
					$prev_length = length($input[$fasta_count-1][2]);
					$prev_do_not_cross = $cur_do_not_cross;

				}
				if (length($string)>0){
					if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and (length($string) + $prev_length) < 80){
						#we are okay to merge strings of short length to inserts
						$input[$fasta_count-1][2] .= $string; #string
					} else {
						if (length($string) < 80){
							$splittype[$fasta_count][0] = 0; # type 0 = insert
						}else{
							$splittype[$fasta_count][0] = 1; # type 1 = part x of y
							if (defined $partcount[$name_i]){
								$partcount[$name_i] += 1;
							} else {
								$partcount[$name_i] = 1;
							}
						}
						$input[$fasta_count][0] = $no; 
						$input[$fasta_count][1] = $cur_name;
						$input[$fasta_count][2] = $string; #string
						$splittype[$fasta_count][1] = $name_i;
						$fasta_count++;
					}
					if (defined $partcount[$name_i]){
						$partcount[$name_i] += 1;
					} else {
						$partcount[$name_i] = 1;
					}

					$flag_first = 0;
					$prev_length = length($input[$fasta_count-1][2]);
					$prev_do_not_cross = $cur_do_not_cross;
				}
	
			} 

			else {
	
				if (length($string)>0){
					if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and (length($string) + $prev_length) < 80){
						#we are okay to merge strings of short length to inserts
						$input[$fasta_count-1][2] .= $string; #string
					} else {
						if (length($string) < 80){
							$splittype[$fasta_count][0] = 0; # type 0 = insert
						}else{
							$splittype[$fasta_count][0] = 2; # type 2 = not modyfied
						}
						$input[$fasta_count][0] = $no; 
						$input[$fasta_count][1] = $cur_name;
						$input[$fasta_count][2] = $string; #string
						$splittype[$fasta_count][1] = $name_i;

						$fasta_count++;
					}
					if (defined $partcount[$name_i]){
						$partcount[$name_i] += 1;
					} 

					else {
						$partcount[$name_i] = 1;
					}

					$flag_first = 0;
					$prev_length = length($input[$fasta_count-1][2]);
					$prev_do_not_cross = $cur_do_not_cross;
				}

				if (defined $namecount[$name_i]){
					$namecount[$name_i] += 1;
				} 

				else {
					$namecount[$name_i] = 1;
				}
			}
		#	$prev_length = length($input[$fasta_count-1][2]);
		#	$prev_do_not_cross = $cur_do_not_cross;
	
		}
		# if line starts with > elsif +
		# define approperiate arrays/strings	
	}
	
	# Patch 2014.01.08 Boston, Jakob:
	if($lastline=~m/\+/){
		$backbone++;
	}

	close IN; 
	
	
	#sanity final check
	
	# if ($sanity_batch_odd == 1){
	# 	die "odd number of plusses";
	# }

	### Disabled on request from Lars
	#if ($circular_dna eq "TRUE"){
	#	$fasta_count++;
	#	$name_i++;
	#	$input[$fasta_count][0] = 0;
	#	$input[$fasta_count][1] = "Virtual circular DNA (based on: $input[0][1])";
	#	$input[$fasta_count][2] = $input[0][2];
	#	$splittype[$fasta_count][0] = 3;
	#	$splittype[$fasta_count][1] =  $name_i;
	#} 
	
	
	#names
	my $j=1;
	my $prev_input=0;
	for (my $i=0;$i<$fasta_count;$i++){
		#loop over all entries
		# If they are of type fragment, add  part x of y if more than 1 part
		if ($splittype[$i][1]!=$prev_input){
			$prev_input++;
			$j=1;
		}
	
		# add the name
		if($splittype[$i][0]==1 and $partcount[$prev_input]!=1){
			my $tempcount = $partcount[$prev_input]-1;
			$input[$i][1] .= " - part $j of $tempcount";
			$j++;
		}elsif($splittype[$i][0]==0){
			$input[$i][1] .= " - insert";
		}
	
	#	#flag for long fasta insert
	#	if ($splittype[$i][0]==0 or $splittype[$i][0]==0){
	#		if (length($input[$i][2])>80){
	#			$flag_long_insert=1;
	#		}
	#	}

	}
	

	# print "flag_long_insert = $flag_long_insert\n" if ($verbose eq "TRUE");





###JAKOB option
#	 # printing to test of program is working
#	 if ($verbose eq "TRUE"){
#	 	print "test\n";
#	 	for (my $x = 0; $x <= $#input; $x++){
#	 		for (my $y = 0; $y <= $#{$input[$x]}; $y++){
#	 			print "x=$x y=$y ",$input[$x][$y],"\t";
#	 		}
#	 		print"$splittype[$x][1]\n\n";
#	 	}
#	 }
#	 print "tesr2\n";
#	 print(@array_of_names);
#	 print"\n";
#
#	 print "\$backbone_around_combinatorial =  $backbone_around_combinatorial\n";


###LARS option
	return (\@input, $batchinput, \@inputcount, $backbone);


}

# sub inputfile {
# 	# print "Entering sub inputfile\n" if ($debug eq "TRUE");
# 	###
# 	# Input file handeling
# 	###
	
# 	my $inputfasta = $_[0];
# 	my $circular_dna = $_[1];
# 	my $fasta_count = 0;
# 	my $no = 0;
# 	my $batchinput = "FALSE";
# 	my $flag_for_varying_fasta = "FALSE";
# 	my $flag_long_insert = 0;
# 	my $end_insert;
# 	my @splittype;
# 	## splittype [fasta count][0] identifyer of which input number we came from
# 	## splittype [fasta count][1] identifyer: 2=not touched; 1=parted; 0=inserted
# 	my @input;
# 	my @namecount;
# 	my @partcount;
# 	my $name_i=-1;
# 	#my $inputcount[0] = 0;
# 	my $namepatch;
# 	my $flag_first;
# 	my $prev_length = 0;	
# 	my $cur_do_not_cross = 0;
# 	my $prev_do_not_cross = 0;
# 	my $cur_name;
# 	my @array_of_names;
	
# 	# read into variables

# 	open (IN, '<', $inputfasta) or die "ERROR: you have entered invalid filename(s): $!";
# 	my $line = <IN>;
	
# 	# LOOP
# 	while (defined $line){
# 		$line =~ tr/\r/\n/; # translitterate makes carrrige return to newlines
# 		chomp($line);
# 		# &sanity_check_line($line);
# 		# Skip empty lines in input
# 		if ($line =~ m/^\s*$/){
# 			$line = <IN>;
# 		# save name if line starts with >
# 		} elsif ( $line =~ m/^>(.*)/ ){
# 			push (@array_of_names,$1);
# 			$flag_first = 1;
# 			$name_i++;
# 			$inputcount[0]++;
# 			# "$no" is a number to determine if input is a part of combinatorial input.
# 			$cur_name = $1;
# 			if ($flag_for_varying_fasta eq "FALSE"){
# 				$no=0;
# 			} else {
# 				$no++;
# 				$cur_do_not_cross++;
# 			}
# 			$input[$fasta_count][0] = $no;
# 			$input[$fasta_count][1] = $1;

# 			$line = <IN>;
# 		# change state of flag if line starts with +
# 		} elsif ( $line =~ m/^\+(.*)$/ ){
# 			$cur_do_not_cross++;
# 			$batchinput = "TRUE";
# 			if ($flag_for_varying_fasta eq "FALSE") {
# 				$flag_for_varying_fasta = "TRUE";
# 			} else {
# 				$flag_for_varying_fasta = "FALSE";
# 				$no=0;
# 			}
# 			$line = <IN>;
# 		} 
# 		# if neither line starts with > nor + DNA in fasta is assumed, 
# 		### Now we check if the DNA should be modified, that is the case if we have squared brackets present.
# 		else {
# 			# all DNA will be concatenated into $string
# 			my $string;
# 			while (defined $line and ($line =~ m/^[>\+]/) == 0 ){
# 				$line =~ tr/\r/\n/; # translitterate makes carrrige return to newlines
# 				chomp($line);
# 				$line =~ s/\s//g;			#removing all whitespace
# 				$string .= uc($line);		#converting DNA to uppercase
# 				$line = <IN>;
# 			}
# 		#	my $fragment_no=0;
# 		#	my $insertion_no=0;
# 		#	&sanity_check_string($string);
	
# 		# check id the DNA contains an equal sign: = 
# 		# in this case, DNA must be split up according to rules
# 			if ($string =~ m/=/){
# 				while ($string =~m/^(.*?)\[(.*?)=(.*?)\](.*)$/){
# 					my ($dollar1,$dollar2,$dollar3,$dollar4) = ($1,$2,$3,$4);
# 					my ($length1,$length2,$length3,$length4) = (length($dollar1),length($dollar2),length($dollar3),length($dollar4));
					
# 					#Pseudo Algorithm

# 					#a + may not have been crossed
# 					# if varyig fasta flag is up, a > must not have been crossed
# 					#we are not supposed to merge strings to inserts
# 					if ($length1 > 0){
# 						if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and ($length1 + $prev_length) < 80){
# 						#we are okay to merge strings of short length to inserts
# 							$input[$fasta_count-1][2] .= $dollar1; #string
# 						} else {
# 							if ($length1 < 80){
# 								$splittype[$fasta_count][0] = 0; # type 0 = insert
# 							}else{
# 								$splittype[$fasta_count][0] = 1; # type 1 = part x of y
# 								if (defined $partcount[$name_i]){
# 									$partcount[$name_i] += 1;
# 								} else {
# 									$partcount[$name_i] = 1;
# 								}
# 							}
# 							$input[$fasta_count][0] = $no; 
# 							$input[$fasta_count][1] = $cur_name;
# 							$input[$fasta_count][2] = $dollar1; #string
# 							$splittype[$fasta_count][1] = $name_i;
# 							$fasta_count++;
# 						}
# 						$string = "[=$dollar3]$dollar4";
# 					}elsif($length3 > 0){
# 						if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and ($length3 + $prev_length) < 80){
# 						#we are okay to merge strings of short length to inserts
# 							$input[$fasta_count-1][2] .= $dollar3; #string
# 						} else {
# 							if ($length3 < 80){
# 								$splittype[$fasta_count][0] = 0; # type 0 = insert
# 							}else{
# 								#WARNING LONG INSERT
# 								$flag_long_insert = 1;
# 								$splittype[$fasta_count][0] = 1; # type 1 = part x of y
# 							}
# 							$input[$fasta_count][0] = $no; 
# 							$input[$fasta_count][1] = $cur_name;
# 							$input[$fasta_count][2] = $dollar3; #string
# 							$splittype[$fasta_count][1] = $name_i;
# 							$fasta_count++;
# 						}
# 						$string = $dollar4;
# 					}else{
# 						$string = $dollar4;
# 					}
				

# 					# if previous string is short (<80) and this one is as well, they can be merged as an insert

# 					# if length1 != 0 dollar1 is saved
# 					# dollar3 and 4 are put into string
# 					# else if length3 !=0 length3 is saved
# 					#dollar4 is put into string.
					
# 					$flag_first = 0;
# 					$prev_length = length($input[$fasta_count-1][2]);
# 					$prev_do_not_cross = $cur_do_not_cross;

# 				}
# 				if (length($string)>0){
# 					if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and (length($string) + $prev_length) < 80){
# 						#we are okay to merge strings of short length to inserts
# 						$input[$fasta_count-1][2] .= $string; #string
# 					} else {
# 						if (length($string) < 80){
# 							$splittype[$fasta_count][0] = 0; # type 0 = insert
# 						}else{
# 							$splittype[$fasta_count][0] = 1; # type 1 = part x of y
# 							if (defined $partcount[$name_i]){
# 								$partcount[$name_i] += 1;
# 							} else {
# 								$partcount[$name_i] = 1;
# 							}
# 						}
# 						$input[$fasta_count][0] = $no; 
# 						$input[$fasta_count][1] = $cur_name;
# 						$input[$fasta_count][2] = $string; #string
# 						$splittype[$fasta_count][1] = $name_i;
# 						$fasta_count++;
# 					}
# 					if (defined $partcount[$name_i]){
# 						$partcount[$name_i] += 1;
# 					} else {
# 						$partcount[$name_i] = 1;
# 					}

# 					$flag_first = 0;
# 					$prev_length = length($input[$fasta_count-1][2]);
# 					$prev_do_not_cross = $cur_do_not_cross;
# 				}
	
# 			} 

# 			else {
	
# 				if (length($string)>0){
# 					if ($prev_do_not_cross == $cur_do_not_cross and $fasta_count > 0 and (length($string) + $prev_length) < 80){
# 						#we are okay to merge strings of short length to inserts
# 						$input[$fasta_count-1][2] .= $string; #string
# 					} else {
# 						if (length($string) < 80){
# 							$splittype[$fasta_count][0] = 0; # type 0 = insert
# 						}else{
# 							$splittype[$fasta_count][0] = 2; # type 2 = not modyfied
# 						}
# 						$input[$fasta_count][0] = $no; 
# 						$input[$fasta_count][1] = $cur_name;
# 						$input[$fasta_count][2] = $string; #string
# 						$splittype[$fasta_count][1] = $name_i;

# 						$fasta_count++;
# 					}
# 					if (defined $partcount[$name_i]){
# 						$partcount[$name_i] += 1;
# 					} 

# 					else {
# 						$partcount[$name_i] = 1;
# 					}

# 					$flag_first = 0;
# 					$prev_length = length($input[$fasta_count-1][2]);
# 					$prev_do_not_cross = $cur_do_not_cross;
# 				}

# 				if (defined $namecount[$name_i]){
# 					$namecount[$name_i] += 1;
# 				} 

# 				else {
# 					$namecount[$name_i] = 1;
# 				}
# 			}
		
# 	#	$prev_length = length($input[$fasta_count-1][2]);
# 	#	$prev_do_not_cross = $cur_do_not_cross;
	
# 		}
# 		# if line starts with > elsif +
# 		# define approperiate arrays/strings	

# 	}
# 	close IN; 
	
	
# 	#sanity final check
	
# 	# if ($sanity_batch_odd == 1){
# 	# 	die "odd number of plusses";
# 	# }

# 	### Disabled on request from Lars
# 	#if ($circular_dna eq "TRUE"){
# 	#	$fasta_count++;
# 	#	$name_i++;
# 	#	$input[$fasta_count][0] = 0;
# 	#	$input[$fasta_count][1] = "Virtual circular DNA (based on: $input[0][1])";
# 	#	$input[$fasta_count][2] = $input[0][2];
# 	#	$splittype[$fasta_count][0] = 3;
# 	#	$splittype[$fasta_count][1] =  $name_i;
# 	#} 
	
	
# 	#names
# 	my $j=1;
# 	my $prev_input=0;
# 	for (my $i=0;$i<$fasta_count;$i++){
# 		#loop over all entries
# 		# If they are of type fragment, add  part x of y if more than 1 part
# 		if ($splittype[$i][1]!=$prev_input){
# 			$prev_input++;
# 			$j=1;
# 		}
	
# 		# add the name
# 		if($splittype[$i][0]==1 and $partcount[$prev_input]!=1){
# 			my $tempcount = $partcount[$prev_input]-1;
# 			$input[$i][1] .= " - part $j of $tempcount";
# 			$j++;
# 		}elsif($splittype[$i][0]==0){
# 			$input[$i][1] .= " - insert";
# 		}
	
# 	#	#flag for long fasta insert
# 	#	if ($splittype[$i][0]==0 or $splittype[$i][0]==0){
# 	#		if (length($input[$i][2])>80){
# 	#			$flag_long_insert=1;
# 	#		}
# 	#	}

# 	}
	
	
# 	# print "flag_long_insert = $flag_long_insert\n" if ($verbose eq "TRUE");





# ###JAKOB option
# 	# # printing to test of program is working
# 	# if ($verbose eq "TRUE"){
# 	# 	print "test\n";
# 	# 	for (my $x = 0; $x <= $#input; $x++){
# 	# 		for (my $y = 0; $y <= $#{$input[$x]}; $y++){
# 	# 			print "x=$x y=$y ",$input[$x][$y],"\t";
# 	# 		}
# 	# 		print"$splittype[$x][1]\n\n";
# 	# 	}
# 	# }

# 	# print "tesr2\n";
# 	# print(@array_of_names);
# 	# print"\n";


# ###LARS option
# 	return (\@input, $batchinput, \@inputcount);


# }
			
		
				
sub batchinputconversion {
	my @input = @{$_[0]};
	my @inputcount;
	# print "number of input sequences ", scalar @input, "\n";
	my @inputs;
	my $numberofbatches = 0;
	for (my $i = 0; $i < scalar @input; $i++) {
		if ($input[$i][0] > $numberofbatches) {
			$numberofbatches = $input[$i][0];
		}
	}
	for (my $i = 1; $i <= $numberofbatches; $i++) {
		$inputcount[$i-1] = 0;
		my @temparray;
		for (my $ii = 0; $ii < scalar @input; $ii++) {
			if ($input[$ii][0] == 0 or $input[$ii][0] == $i) {
				$temparray[$inputcount[$i-1]][0] = $input[$ii][0];
				$temparray[$inputcount[$i-1]][1] = $input[$ii][1];
				$temparray[$inputcount[$i-1]][2] = $input[$ii][2];
				$inputcount[$i-1]++;
			}
		}
		$inputs[$i-1] = [@temparray];
	}
	# for (my $i = 0; $i <= $numberofbatches; $i++) {
	# 	#for (my $ii = 0; $ii < scalar @{$input[$i]}; $ii++) {
	# 		print "seq $i $input[$i][0]\n$input[$i][1]\n\n";
	# 	#}
	# }
	# print "number of batches: $numberofbatches\n";
	return ($numberofbatches, \@inputs, \@inputcount);
}



sub primerextension {
	my @inputs = @{$_[0]};
	my $circularoutput = $_[1];
	my @primerextension;
	my $numberofinserts = 0;
	# print scalar @{$inputs[0]}, "\n";
	for (my $i = 0; $i < scalar @inputs; $i++) {
		for (my $ii = 0; $ii < scalar @{$inputs[$i]}; $ii++) {
			if (length $inputs[$i][$ii][2] < 81) {
				# print "$ii $inputs[$i][$ii][2]\n";
				if ($ii == (scalar @{$inputs[$i]})-1) {
					my $shortseq = $inputs[$i][$ii][2];
					$primerextension[$i][$ii][0] = "TRUE";
					$primerextension[$i][$ii][1] = $shortseq;
					$numberofinserts++;
					splice (@{$inputs[$i]}, $ii, 1);
				}
				else {
					my $shortseq = $inputs[$i][$ii][2];
					my $startlength;
					my $endlength;
					if ($shortseq % 2 == 0) {
						$startlength = length ($shortseq)/2;
						$endlength = length ($shortseq)/2;
					} 
					else {
						$startlength = (length ($shortseq)/2)+0.5;
						$endlength = (length ($shortseq)/2)-0.5;
					}
					$primerextension[$i][$ii][0] = "TRUE";
					$primerextension[$i][$ii][1] = $shortseq;
					$primerextension[$i][$ii][2] = $startlength;
					$primerextension[$i][$ii][3] = $endlength;
					# print "$primerextension[$i][$ii][1]\n$primerextension[$i][$ii][2]\n$primerextension[$i][$ii][3]\n";
					$numberofinserts++;
					splice (@{$inputs[$i]}, $ii, 1);
				}
			}
		}
		my $n = scalar @{$inputs[$i]};
		if ($circularoutput eq "TRUE") {
			if ($primerextension[$i][0][0] eq "TRUE" and $primerextension[$i][$n][0] eq "TRUE") {
				my $tempseq = $primerextension[$i][$n][1];
				$tempseq .= $primerextension[$i][0][1];
				$primerextension[$i][0][1] = $tempseq;
				if ((length $primerextension[$i][0][1]) > 80) {
					die "ERROR: two insertions are attempted to be introduced next to each other in circular construct. The combined length of these exceed 80 bp, which may cause primer instability. Please check input\n";
				}

				if ($primerextension[$i][0][1] % 2 == 0) {
					$primerextension[$i][0][2] = length ($primerextension[$i][0][1])/2;
					$primerextension[$i][0][3] = length ($primerextension[$i][0][1])/2;
				} 
				else {
					$primerextension[$i][0][2] = (length ($primerextension[$i][0][1])/2)+0.5;
					$primerextension[$i][0][3] = (length ($primerextension[$i][0][1])/2)-0.5;
				}

				$primerextension[$i][$n][0] = "";
				$primerextension[$i][$n][1] = "";
				$primerextension[$i][$n][2] = "";
				$primerextension[$i][$n][3] = "";
			}
			if ($primerextension[$i][0][0] eq "TRUE") {
				$primerextension[$i][$n][0] = $primerextension[$i][0][0];
				$primerextension[$i][$n][1] = $primerextension[$i][0][1];
				$primerextension[$i][$n][2] = $primerextension[$i][0][2];
				$primerextension[$i][$n][3] = $primerextension[$i][0][3];
				$primerextension[$i][0][0] = "";
				$primerextension[$i][0][1] = "";
				$primerextension[$i][0][2] = "";
				$primerextension[$i][0][3] = "";
			}	
		}
	}

	#print scalar @{$inputs[0]}, "\n";
	return (\@inputs, \@primerextension, $numberofinserts);

	# for (my $i = 0; $i < scalar @inputs; $i++) {
	# 	for (my $ii = 0; $ii < scalar @{$inputs[$i]}; $ii++) {
	# 		if ($primerextension[$i][$ii][1] ne "TRUE") {
	# 			$tempinputs[$i][$ii] = [$inputs[$i][$ii]];
	# 		}
	# 	}
	# }

	# for (my $i = 0; $i < scalar @inputs; $i++) {
	# 	for (my $ii = 0; $ii < scalar @{$inputs[$i]}; $ii++) {
	# 		if ($ii == 0 or $ii == (scalar @{$inputs[$i]})-1) {
	# 			#oh, what to do if fragment is first or last...
	# 		}
	# 		else {
	# 			if (length $inputs[$i][$ii][2] < 81) {
	# 				my $shortseq = $inputs[$i][$ii][2];
	# 				splice (@{$inputs[$i]}, $ii, 1);
	# 				my $frontlength;
	# 				my $backlength;
	# 				if (length $shortseq % 2) {
	# 					$frontlength = length ($shortseq)/2;
	# 					$backlength = length ($shortseq)/2;
	# 				} 
	# 				else {
	# 					$frontlength = (length ($shortseq)/2)+0.5;
	# 					$backlength = (length ($shortseq)/2)-0.5;
	# 				}
	# 				my $front = substr($shortseq, 0, $frontlength);
	# 				my $back = substr($shortseq, $frontlength, $backlength);
	# 				$inputs[$i][$ii-1][2] .= $front;
	# 				$back .= $inputs[$i][$ii][2];
	# 				$inputs[$i][$ii][2] = $back; 
	# 				$primerextension[$i][$ii-1][1] = $frontlength;
	# 				$primerextension[$i][$ii][0] = $backlength;
	# 			}
	# 		}
	# 	}
	# }
}

# sub linkerexpand {
# 	for (my $i = 0; $i < $n; $i++) {
# 		unless ($linker{$i}{0} eq "") {
# 			my $templength = length $linker{$i}{0};
# 			if ($templength%2 == 1) {
# 				$linker{$i}{1} = substr ($linker{$i}{0}, 0, ($templength / 2)-0.5);
# 				$linker{$i}{2} = ($templength / 2)-0.5;
# 				$linker{$i}{3} = substr ($linker{$i}{0}, ($templength / 2), ($templength / 2)+0.5);
# 				$linker{$i}{4} = ($templength / 2)+0.5;
# 			}
# 			else {
# 				$linker{$i}{1} = substr ($linker{$i}{0}, 0, ($templength / 2));
# 				$linker{$i}{2} = ($templength / 2);
# 				$linker{$i}{3} = substr ($linker{$i}{0}, ($templength / 2), ($templength / 2));
# 				$linker{$i}{4} = ($templength / 2);
# 			}
# 		}
# 	}
# 	return %linker;
# }



sub circular {
	my @inputs = @{$_[0]};
	my $n = $_[1];
	push (@inputs, $inputs[0]);
	return (\@inputs);
}



sub brickseqfrags {
	my @input = @{$_[0]};
	my $n = $_[1];
	my @primerextension = @{$_[2]};
	my $circularoutput = $_[3];
	my @brickseqfrags;

	if ($primerextension[0][0] eq "TRUE") {
		my $frag1 = $primerextension[0][1];
		$frag1 .= substr($input[0][2], 0, 50);
		my $frag2 = substr($input[0][2], (length $input[0][2])-50, 50);
		@brickseqfrags[0] = ([$frag1,$frag2]);
	}
	else {
		my $frag1 = substr($input[0][2], 0, 50);
		my $frag2 = substr($input[0][2], (length $input[0][2])-50, 50);
		@brickseqfrags[0] = ([$frag1,$frag2]);
	}

	for (my $i = 1; $i < $n; $i++) {
		if ($primerextension[$i][0] eq "TRUE") {
			my $frag1 = $primerextension[$i][1];
			$frag1 .= substr($input[$i][2], 0, 50);
			my $frag2 = substr($input[$i][2], (length $input[$i][2])-50, 50);
			@brickseqfrags[$i] = ([$frag1,$frag2]);
		}
		else {
			my $frag1 = substr($input[$i][2], 0, 50);
			my $frag2 = substr($input[$i][2], (length $input[$i][2])-50, 50);
			@brickseqfrags[$i] = ([$frag1,$frag2]);
		}
	}

	# if ($primerextension[$n-1][0] eq "TRUE") {
	# 	my $tempseq = $primerextension[$n-1][1];
	# 	$tempseq .= $brickseqfrags[$n-1][1];
	# 	print "$tempseq\n";
	# 	$brickseqfrags[$n-1][1] = $tempseq;
	# }

	# if ($circularoutput eq "TRUE") {

	# 	if ($primerextension[0][0] eq "TRUE") {
	# 		my $tempseq = $primerextension[0][1];
	# 		$tempseq .= $brickseqfrags[$n-1][1];
	# 		$brickseqfrags[$n-1][0] = $tempseq;
	# 	}	
	# }

	# for (my $i = 0; $i < $n; $i++) {
	# 	# print "$i $input[$i][2]\n";
	# 	# print "$i $primerextension[$i][1]\n";
	# 	# if ($i == 0) {
	# 	# 	if ($primerextension[$i][0] eq "TRUE") {
	# 	# 		# Oh, what to do if insert is first...
	# 	# 	}
	# 	# 	else {
	# 	# 		my $frag1 = substr($input[$i][2], 0, 40);
	# 	# 		my $frag2 = substr($input[$i][2], (length $input[$i][2])-40, 40);
	# 	# 		@brickseqfrags[$i] = ([$frag1,$frag2]);
	# 	# 	}
	# 	# }
	# 	# elsif ($i > 0 and $i < $n) {
	# 	if ($i > 0) {
	# 		if ($primerextension[$i][0] eq "TRUE") {
	# 			my $frag0 = substr($primerextension[$i][1], 0, $primerextension[$i][2]);
	# 			$brickseqfrags[$i-1][1] .= $frag0;
	# 			# print "$brickseqfrags[$i-1][1]\n";
	# 			my $frag1 = substr($primerextension[$i][1], $primerextension[$i][2], $primerextension[$i][3]);
	# 			$frag1 .= substr($input[$i][2], 0, 40);
	# 			# print "$frag2\n";
	# 			my $frag2 = substr($input[$i][2], (length $input[$i][2])-40, 40);
	# 			@brickseqfrags[$i] = ([$frag1,$frag2]);
	# 			print "$i\n$frag1\n$frag2\n";
	# 		}
	# 		else {
	# 			my $frag1 = substr($input[$i][2], 0, 40);
	# 			my $frag2 = substr($input[$i][2], (length $input[$i][2])-40, 40);
	# 			@brickseqfrags[$i] = ([$frag1,$frag2]);
	# 			#print "$i\n$frag1\n$frag2\n";
	# 		}
	# 	}
	# 	else {
	# 		my $frag1 = substr($input[$i][2], 0, 40);
	# 		my $frag2 = substr($input[$i][2], (length $input[$i][2])-40, 40);
	# 		@brickseqfrags[$i] = ([$frag1,$frag2]);
	# 		#print "$i\n$frag1\n$frag2\n";
	# 	}

	# 	# }
	# 	# elsif ($i == $n-1) {
	# 	# 	if ($primerextension[$i][0] eq "TRUE") {
	# 	# 	# Oh, what to do if insert is last...
	# 	# 	}
	# 	# 	else {
	# 	# 		my $frag1 = substr($input[$i][2], 0, 40);
	# 	# 		my $frag2 = substr($input[$i][2], (length $input[$i][2])-40, 40);
	# 	# 		@brickseqfrags[$i] = ([$frag1,$frag2]);
	# 	# 	}
	# 	# }
	# }
	return \@brickseqfrags;
}



sub joined {
	my @brickseqfrags = @{$_[0]};
	my $n = $_[1];
    my @joined;

	for (my $i = 0; $i < $n-1; $i++) {	
		my $join = "";	
		$join .= $brickseqfrags[$i][1];
		$join .= $brickseqfrags[$i+1][0];
		$joined[$i] = $join;
	}
	return \@joined;
}



sub ATpos {

	my @joined = @{$_[0]};
	my $n = $_[1];
	my $batchinput = $_[2];
	my @A;
	my @T;


	###################################################################
	#All positions of A's and T's for each joining region are stored
	#in the arrays @A and @T.

	# print "$n\n";
	for (my $i = 0; $i < $n-1; $i++) {
		my $Apos = 0;
		for (my $ii = 0; $ii < (length $joined[$i]); $ii++) {
			if (substr($joined[$i], $ii, 1) eq "A") {
				$A[$i][$Apos] = $ii;
				$Apos++;
				# print "$ii\t";
			}
		}
		# print "\n";
		# print "A: $Apos\n";
		my $Tpos = 0;
		for (my $ii = 0; $ii < (length $joined[$i]); $ii++) {
			if (substr($joined[$i], $ii, 1) eq "T") {
				$T[$i][$Tpos] = $ii+1;
				$Tpos++;
			}
		}
		# print "T: $Tpos\n";
	}


	###################################################################
	#For batch inputs, 

	# print "A's before\n";
	# for (my $a = 0; $a < scalar @{$A[0]}; $a++) {
	# 	print "$A[0][$a]\t";
	# }
	# print "\n\n";

	# print "T's before\n";
	# for (my $t = 0; $t < scalar @{$T[0]}; $t++) {
	# 	print "$T[0][$t]\t";
	# }
	# print "\n\n";

	if ($batchinput eq "TRUE") {
		if ($n < 2) {
			for (my $ii = 0; $ii < scalar @{$T[0]}; $ii++) {
					if ($T[0][$ii] > 50) {
						splice (@{$T[0]}, $ii, 1);
						$ii--;
					}
			}
			for (my $ii = 0; $ii < scalar @{$A[-1]}; $ii++) {
				if ($A[-1][$ii] < 50) {
					splice (@{$A[-1]}, $ii, 1);
					$ii--;
				}
			}
		}
		for (my $ii = 0; $ii < scalar @{$A[0]}; $ii++) {
				if ($A[0][$ii] > 50) {
					splice (@{$A[0]}, $ii, 1);
					$ii--;
				}
		}
		for (my $ii = 0; $ii < scalar @{$T[-1]}; $ii++) {
				if ($T[-1][$ii] < 50) {
					splice (@{$T[-1]}, $ii, 1);
					$ii--;
				}
		}
		# print "A: ", scalar @{$A[0]}, "\n";
		# print "T: ", scalar @{$T[0]}, "\n";
	}

	# print "A's after\n";
	# for (my $a = 0; $a < scalar @{$A[0]}; $a++) {
	# 	print "$A[0][$a]\t";
	# }
	# print "\n\n";

	# print "T's after\n";
	# for (my $t = 0; $t < scalar @{$T[0]}; $t++) {
	# 	print "$T[0][$t]\t";
	# }
	# print "\n\n";

	# if ($A[0][-1] < 24) {
	# 	die "ERROR: A-to-T segment in joining region of $inputs[0][0][1] and $inputs[0][0+1][1] is $A[0][-1] bp from joining region, USER fusion might not be possible\n";
	# }
	# print "HERE $T[-1][0]\n";
	# if ($T[-1][0] > 56) {
	# 	die "ERROR: A-to-T segment in joining region of $inputs[0][-2][1] and $inputs[0][-1][1] is $T[0][0] bp from joining region, USER fusion might not be possible\n";	
	# }

	for (my $i = 0; $i < $n-1; $i++) {
		my $nicelengthflag = 0;
		# print "$i $joined[$i]\n";
		for (my $a = 0; $a < scalar @{$A[$i]}; $a++) {
			for (my $t = 0; $t < scalar @{$T[$i]}; $t++) {
				if ($A[$i][$a] < $T[$i][$t]) {
					my $tempAT = substr($joined[$i], $A[$i][$a], $T[$i][$t]-$A[$i][$a]);
					# print "$A[$i][$a] $T[$i][$t] $tempAT\n";
					if (length $tempAT > 7 and length $tempAT < 13) {
						$nicelengthflag = 1;
						# print "$A[$i][$a] $T[$i][$t] $tempAT\n";
					}
				}
			}
		}
		if ($nicelengthflag == 0) {
			die "ERROR: no A-to-T segment in joining region of $inputs[0][$i][1] and $inputs[0][$i+1][1] is between 7 and 13 bp in length, USER fusion might not be possible\n";
		}
	}

	return (\@A, \@T);
}



sub ATscore {

	my @joined = @{$_[0]};
    my @A = @{$_[1]};
    my @T = @{$_[2]};
    my $n = $_[3];
    my @scoredfts;
	my $count;

	for (my $i = 0; $i < $n-1; $i++) { 
		$count = 0;
		my $penlen;	#penalty for length
		my $penpos;	#penalty for position
		my $score;	#score of fusion tail
		my $ft;		#fusion tail
		for (my $ia = 0; $ia < scalar @{$A[$i]}; $ia++) {
			for (my $it = 0; $it < scalar @{$T[$i]}; $it++) {
				if ($A[$i][$ia] < $T[$i][$it] and $A[$i][$ia] ne "" and $T[$i][$it] ne "") {
					$ft = substr($joined[$i], $A[$i][$ia], $T[$i][$it] - $A[$i][$ia]);	
					#if ($i == 0) {
						#print "$ft\n";
					#}
					if (length $ft < 7) {
						$penlen = 1000;
					}
					if (length $ft > 13) {
						$penlen = 1000;
					}
					elsif (length $ft > 9) {
						$penlen = (length $ft) - 9;
					}
					elsif (length $ft == 7 or length $ft == 8 or length $ft == 9) {
						$penlen = 0;
					}
					if    ( ( (length $joined[$i])/2 ) > ( $A[$i][$ia] + ($T[$i][$it]-$A[$i][$ia])/2 ) ) { 
						$penpos = (((length $joined[$i])/2) - ($A[$i][$ia]+(($T[$i][$it]-$A[$i][$ia])/2)));
					}
					elsif ( ( (length $joined[$i])/2 ) < ( $A[$i][$ia] + ($T[$i][$it]-$A[$i][$ia])/2 ) ) {
						$penpos = (($A[$i][$ia]+(($T[$i][$it]-$A[$i][$ia])/2)) - (length $joined[$i])/2);
					}
					elsif (((length $joined[$i])/2) == ($A[$i][$ia]+(($T[$i][$it]-$A[$i][$ia])/2))) {
						$penpos = 0;
					}
					$score = 0 + $penlen + $penpos;
					if ($i == 0) {
						# print "$i ", length $ft, " $ft\n$A[$i][$ia]\t$T[$i][$it]\t$penpos\t$penlen\t$score\n";
					}
					#if ($score < 1000) {
						# if ($i == 3) {
						# 	print length $ft, " $ft\n$A[$i][$ia]\t$T[$i][$it]\t$penpos\t$penlen\t$score\n";
						# }


					###################################################################
					#If the joining regions contain degenerate nucleotides, these must
					#be in the overhangs of the primers, not the fusion tails. All
					#fusion tails containing dg nts must be removed from the pool
				
					unless (substr ($joined[$i], $A[$i][$ia], $T[$i][$it] - $A[$i][$ia]) =~ m/[RYKMBVDHN]/) {
						$scoredfts[$i][$count] = "$score $A[$i][$ia] $T[$i][$it]";
						$count++;
					}
						#print "$i\n";
						#print "$i ", length $ft, " $ft\n$A[$i][$ia]\t$T[$i][$it]\t$penpos\t$penlen\t$score\n";
					#}
				}
			}
		}
		#print "$i $count\n";
		# if ($n > 1) {
		# 	if ($count == 0) {
		# 		die "ERROR\n";
		# 	}
		# }
	}
	

	for (my $i = 0; $i < $n-1; $i++) {
		@{$scoredfts[$i]} = sort {$a <=> $b} @{$scoredfts[$i]};
		# print "$i\n";
		for (my $ii= 0; $ii < scalar @{$scoredfts[$i]}; $ii++) {
			# print "$scoredfts[$i][$ii]\n";
		}
	}
	return \@scoredfts;
}



sub scores {

	my @scoredfts = @{$_[0]};
	my $n = $_[1];
	my @scores;

	for (my $i = 0; $i < $n-1; $i++) {
		for (my $ii = 0; $ii < $#{$scoredfts[$i]}; $ii++) {
			$scoredfts[$i][$ii] =~ m/(\d+\.*\d*)\s\d+\s\d+/;
			$scores[$i][$ii] = $1;
			# print "$scores[$i][$ii]\n";
		}
	}
	return \@scores;
}



sub bindingregion {
    my @scoredfts = @{$_[0]};
    my @joined = @{$_[1]};
    my $n = $_[2];
	my @Apos;
	my @Tpos;
	my @brforpos;
	my @brrevpos;
	my @brfor;
	my @brrev;
	my @fts;

	for (my $i = 0; $i < $n-1; $i++) {
		for (my $ii = 0; $ii < scalar @{$scoredfts[$i]}; $ii++) {
			# sprint "$i $ii\n";
			my $temp;
			my $insertlimstart = 50;
			my $insertlimend = (length $joined[$i])-50;
			# print "$i start $insertlimstart\n";
			# print "$i end $insertlimend\n";
			# print length $joined[$i], " $insertlimstart $insertlimend\n";
			if ($scoredfts[$i][$ii] =~ m/\d+\.*\d*\s(\d+)\s(\d+)/) {
				$Apos[$i][$ii] = $1;
				$Tpos[$i][$ii] = $2;
				# print "$Apos[$i][$ii]\t$Tpos[$i][$ii]\n";
				# if (length $joined[$i] > 80) {
				# 	if (((length $joined[$i])/2)
				# }
			}
			for (my $iii = 18; $iii < 25; $iii++) {
				if ($Tpos[$i][$ii] > $insertlimend) {
					$temp = substr ($joined[$i], $Tpos[$i][$ii], $iii);
					$brforpos[$i][$ii] = $Tpos[$i][$ii];
				}
				elsif ($Tpos[$i][$ii] <= $insertlimend) {
					$temp = substr ($joined[$i], $insertlimend, $iii);
					$brforpos[$i][$ii] = $insertlimend;
					# print "$Tpos[$i][$ii] $brforpos[$i][$ii] $temp\n";
				}
				if (length $temp == $iii) {
					$brfor[$i+1][$ii][$iii] = $temp;
				}
			}
			for (my $iii = 18; $iii < 25; $iii++) {
				if ($insertlimstart > $Apos[$i][$ii]) {
					$temp = substr ($joined[$i], $Apos[$i][$ii]-$iii, $iii);
					$brrevpos[$i][$ii] = $Apos[$i][$ii];
					if ($i == 3 and $ii == 0) {
						# print "$i $ii $iii $temp\n";
						# print "$Apos[$i][$ii] $iii\n";
					}
				}
				elsif ($insertlimstart <= $Apos[$i][$ii]) {
					$temp = substr ($joined[$i], $insertlimstart-$iii, $iii);
					$brrevpos[$i][$ii] = $insertlimstart;
				}
				$temp =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				if (length $temp == $iii) {
					$brrev[$i][$ii][$iii] = $temp;
					#print "$i $ii $iii $brrev[$i][$ii][$iii]\n";
				}
			}

			$fts[$i][$ii] = substr ($joined[$i], $Apos[$i][$ii], $Tpos[$i][$ii] - $Apos[$i][$ii]);
		}	
	}
	return (\@Apos, \@Tpos, \@brfor, \@brrev, \@fts, \@brforpos, \@brrevpos);	


	# for (my $i = 0; $i < $n; $i++) {
	# 	for (my $ii = 0; $ii < $#{$scoredfts[$i]}; $ii++) {
	# 		my $temp;
	# 		if ($scoredfts[$i][$ii] =~ m/\d+\.*\d*\s(\d+)\s(\d+)/) {
	# 			$Apos[$i][$ii] = $1;
	# 			$Tpos[$i][$ii] = $2;
	# 		}
	# 		for (my $iii = 7; $iii < 25; $iii++) {
	# 			if ($Tpos[$i][$ii] < (length $joined[$i])/2) {
	# 				$brfor[$i+1][$ii][$iii] = substr ($joined[$i], $Tpos[$i][$ii], ($iii + ((length $joined[$i])/2)-$Tpos[$i][$ii]));
	# 			}
	# 			else {
	# 				$brfor[$i+1][$ii][$iii] = substr ($joined[$i], $Tpos[$i][$ii], $iii);
	# 			}
	# 		}
			
	# 		for (my $iii = 7; $iii < 25; $iii++) {
	# 			if ($Apos[$i][$ii] > (length $joined[$i])/2) {
	# 				$temp = substr ($joined[$i], $Apos[$i][$ii]-($iii + ($Apos[$i][$ii] - (length $joined[$i])/2)), $iii + ($Apos[$i][$ii] - (length $joined[$i])/2));
	# 			}
	# 			else {		
	# 				$temp = substr ($joined[$i], $Apos[$i][$ii]-$iii, $iii);
	# 			}
	# 			$temp =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
	# 			$brrev[$i][$ii][$iii] = $temp;
	# 			print "$brfor[$i+1][$ii][$iii]\n";
	# 		}
			
	# 		$fts[$i][$ii] = substr ($joined[$i], $Apos[$i][$ii], $Tpos[$i][$ii] - $Apos[$i][$ii]);
	# 	}
	# }
	# return (\@Apos, \@Tpos, \@brfor, \@brrev, \@fts);
}



sub rmclashft {
	
	my @fts = @{$_[0]};
    my @scores = @{$_[1]};
    my @brrev = @{$_[2]};
    my @brfor = @{$_[3]};
    my @Apos = @{$_[4]};
    my @Tpos = @{$_[5]};
    my @scoredfts = @{$_[6]};
    my $n = $_[7];
	my @ft;
	my $flag = 1;

	while ($flag == 1) {
		$flag = 0;
		for (my $i = 0; $i < $n-1; $i++) {
			for (my $ii = 1; $ii < $n; $ii++) {
				if ($fts[$i][0] eq $fts[$i+$ii][0]) {
					if ($scores[$i][0] > $scores[$i+$ii][0]) {	
						shift (@{$fts[$i+$ii]});
						shift (@{$scores[$i+$ii]});
						shift (@{$brrev[$i+$ii]});
						shift (@{$brfor[$i+$ii+1]});
						shift (@{$Apos[$i+$ii]});
						shift (@{$Tpos[$i+$ii]});
						if ((scalar @{$fts[$i]}) == 0) {
							die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
						}
					}
					elsif ($scores[$i][0] < $scores[$i+$ii][0]) {
						shift (@{$fts[$i]});
						shift (@{$scores[$i]});
						shift (@{$brrev[$i]});
						shift (@{$Apos[$i]});
						shift (@{$Tpos[$i]});
						shift (@{$brfor[$i+1]});
						if ((scalar @{$fts[$i]}) == 0) {
							die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
						}						
					}
					elsif ($scores[$i][0] == $scores[$i+$ii][0]) {
						if ($#{$scoredfts[$i]} > $#{$scoredfts[$i+$ii]}) {
							shift (@{$fts[$i]});
							shift (@{$scores[$i]});
							shift (@{$brrev[$i]});
							shift (@{$brfor[$i+1]});
							shift (@{$Apos[$i]});
							shift (@{$Tpos[$i]});
							if ((scalar @{$fts[$i]}) == 0) {
								die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
							}
						}
						elsif ($#{$scoredfts[$i]} < $#{$scoredfts[$i+1]}) {
							shift (@{$fts[$i+$ii]});
							shift (@{$scores[$i+$ii]});
							shift (@{$brrev[$i+$ii]});
							shift (@{$brfor[$i+$ii+1]});
							shift (@{$Apos[$i+$ii]});
							shift (@{$Tpos[$i+$ii]});
							if ((scalar @{$fts[$i]}) == 0) {
								die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
							}								
						}
						elsif ($#{$scoredfts[$i]} == $#{$scoredfts[$i+1]}) {
							shift (@{$fts[$i]});
							shift (@{$scores[$i]});
							shift (@{$brrev[$i]});
							shift (@{$brfor[$i+1]});
							shift (@{$Apos[$i]});
							shift (@{$Tpos[$i]});
							if ((scalar @{$fts[$i]}) == 0) {
								die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
							}
						}
						else {
							die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
						}
					}
					else {
						die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
					}
					$flag = 1;
			 	}
				elsif ($fts[$i][0] ne $fts[$i+$ii][0]) {
					$ft[$i] = $fts[$i][0];
				}
				else {
					die "ERROR: it is not possible to generate unique fusion tails for all fragments. This can, for example, occur when attempting to fuse several identical fragments together. Please check input\n";
				}

			}
		}
	}
	return (\@ft);
}



sub uracilft {

	my @ft = @{$_[0]};
	my $n = $_[1];
	my @ftcomp;

	for (my $i = 0; $i < $n-1; $i++) {
		$ftcomp[$i] = $ft[$i];
	}
	for (my $i = 0; $i < $n-1; $i++) {
		$ftcomp[$i] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		$ftcomp[$i] =~ s/T/U/;
	}
	for (my $i = 0; $i < $n-1; $i++) {
		chop $ft[$i];
		$ft[$i] .= "U";
	}
	return (\@ft, \@ftcomp);
}



sub extensions {
	my @primerextension = @{$_[0]};
	my @joined = @{$_[1]};
	my @brforpos = @{$_[2]};
	my @brrevpos = @{$_[3]};
	my @ft = @{$_[4]};
	my $n = $_[5];
	my @Apos = @{$_[6]};
	my @Tpos = @{$_[7]};
	my @brfor = @{$_[8]};
	my @brrev = @{$_[9]};
	my $x = 0;
	for (my $i = 0; $i < scalar @inputs; $i++) {
		my $fwextension;
		my $rvextension;
		if ($primerextension[$i][0][0] eq "TRUE") {
			$fwextension = $primerextension[$i][0][1];
		}
		$primerextension[$i][0][4] = $fwextension;

		for (my $ii = 1; $ii < $n; $ii++) {
			$fwextension = "";
			$rvextension = "";
			if ($primerextension[$i][$ii][0] eq "TRUE") {
				# print "$ii T: $Tpos[$ii-1][0] pos: $brforpos[$ii-1][0]\n";
				# print "$ii A: $Apos[$ii-1][0] pos: $brrevpos[$ii-1][0]\n";
				# print "$joined[$ii-1]\n";
				if ($Tpos[$ii-1][0] < $brforpos[$ii-1][0]) {
					$fwextension = substr ($joined[$ii-1], $Tpos[$ii-1][0], $brforpos[$ii-1][0] - $Tpos[$ii-1][0]);
				}
				
				if ($Apos[$ii-1][0] > $brrevpos[$ii-1][0]) {
					$rvextension = substr ($joined[$ii-1], $brrevpos[$ii-1][0], $Apos[$ii-1][0] - $brrevpos[$ii-1][0]);
					$rvextension =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				}
			}
			else {
				if ($Tpos[$ii-1][0] < $brforpos[$ii-1][0]) {
					$fwextension = substr ($joined[$ii-1], $Tpos[$ii-1][0], $brforpos[$ii-1][0] - $Tpos[$ii-1][0]);
				}
				if ($Apos[$ii-1][0] > $brrevpos[$ii-1][0]) {
					$rvextension = substr ($joined[$ii-1], $brrevpos[$ii-1][0], $Apos[$ii-1][0] - $brrevpos[$ii-1][0]);
					$rvextension =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				}
			}
			$primerextension[$i][$ii][4] = $fwextension;
			$primerextension[$i][$ii-1][5] = $rvextension;
		}

		$rvextension = "";
		if ($primerextension[$i][$n][0] eq "TRUE") {
			$rvextension = $primerextension[$i][$n][1];
			$rvextension =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		}
		$primerextension[$i][$n][5] = $rvextension;
	}
	return (\@primerextension)
}



sub ATGCcount {

    my @brfor = @{$_[0]};
    my @brrev = @{$_[1]};
    my $n = $_[2];	
	my @Afor;
	my @Tfor;
	my @Gfor;
	my @Cfor;
	my @Arev;
	my @Trev;
	my @Grev;
	my @Crev;

	for (my $i = 0; $i < $n; $i++) {
		for (my $iii = 18; $iii < 25; $iii++) {
			for (my $ii = 0; $ii < length $brfor[$i][0][$iii]; $ii++) {
				if (substr ($brfor[$i][0][$iii], $ii, 1) eq "A") {
					$Afor[$i][0][$iii]++;
				}
				elsif (substr ($brfor[$i][0][$iii], $ii, 1) eq "T") {
					$Tfor[$i][0][$iii]++;
				}
				elsif (substr ($brfor[$i][0][$iii], $ii, 1) eq "G") {
					$Gfor[$i][0][$iii]++;
				}
				elsif (substr ($brfor[$i][0][$iii], $ii, 1) eq "C") {
					$Cfor[$i][0][$iii]++;
				}	
			}
			for (my $ii = 0; $ii < length $brrev[$i][0][$iii]; $ii++) {
				if (substr ($brrev[$i][0][$iii], $ii, 1) eq "A") {
					$Arev[$i][0][$iii]++;
				}
				elsif (substr ($brrev[$i][0][$iii], $ii, 1) eq "T") {
					$Trev[$i][0][$iii]++;
				}
				elsif (substr ($brrev[$i][0][$iii], $ii, 1) eq "G") {
					$Grev[$i][0][$iii]++;
				}
				elsif (substr ($brrev[$i][0][$iii], $ii, 1) eq "C") {
					$Crev[$i][0][$iii]++;
				}	
			}
		}
	}
	return (\@Afor, \@Tfor, \@Gfor, \@Cfor, \@Arev, \@Trev, \@Grev, \@Crev);
}


sub GCratiosingle {

	my @Afor = @{$_[0]};
    my @Tfor = @{$_[1]};
    my @Gfor = @{$_[2]};
    my @Cfor = @{$_[3]};
    my @Arev = @{$_[4]};
    my @Trev = @{$_[5]};
    my @Grev = @{$_[6]};
    my @Crev = @{$_[7]};
    my @brrev = @{$_[8]};
    my @brfor = @{$_[9]};
	my @TmGCrev;
	my @TmGCfor;

	for (my $iii = 18; $iii < 25; $iii++) {
		$TmGCrev[0][0][$iii][1] = ($Grev[0][0][$iii]+$Crev[0][0][$iii]) / (length $brrev[0][0][$iii]) * 100;
		$TmGCrev[0][0][$iii][1] = sprintf ("%.2f", $TmGCrev[0][0][$iii][1]);
		$TmGCfor[0][0][$iii][1] = ($Gfor[0][0][$iii]+$Cfor[0][0][$iii]) / (length $brfor[0][0][$iii]) * 100;
		$TmGCfor[0][0][$iii][1] = sprintf ("%.2f", $TmGCfor[0][0][$iii][1]);
	}
	return (\@TmGCrev, \@TmGCfor);
}


sub GCratiomulti {

	my @Afor = @{$_[0]};
    my @Tfor = @{$_[1]};
    my @Gfor = @{$_[2]};
    my @Cfor = @{$_[3]};
    my @Arev = @{$_[4]};
    my @Trev = @{$_[5]};
    my @Grev = @{$_[6]};
    my @Crev = @{$_[7]};
    my @brrev = @{$_[8]};
    my @brfor = @{$_[9]};
    my $n = $_[10];
	my @TmGCrev;
	my @TmGCfor;

	for (my $i = 0; $i < $n; $i++) {
		for (my $iii = 18; $iii < 25; $iii++) {
			$TmGCrev[$i][0][$iii][1] = ($Grev[$i][0][$iii]+$Crev[$i][0][$iii]) / (length $brrev[$i][0][$iii]) * 100;
			$TmGCrev[$i][0][$iii][1] = sprintf ("%.2f", $TmGCrev[$i][0][$iii][1]);
		}
		for (my $iii = 18; $iii < 25; $iii++) {
			$TmGCfor[$i][0][$iii][1] = ($Gfor[$i][0][$iii]+$Cfor[$i][0][$iii]) / (length $brfor[$i][0][$iii]) * 100;
			$TmGCfor[$i][0][$iii][1] = sprintf ("%.2f", $TmGCfor[$i][0][$iii][1]);
			#print "$i\t$iii\t$brfor[$i][0][$iii]\t$TmGCfor[$i][0][$iii][1]\n";
		}
	}
	# for (my $i = 0; $i < $n; $i++) {
	# 	for (my $iii = 18+$linker{$i+1}{2}; $iii < 25+$linker{$i+1}{2}; $iii++) {
	# 		$TmGCrev[$i][0][$iii][1] = ($Grev[$i][0][$iii]+$Crev[$i][0][$iii]) / (length $brrev[$i][0][$iii]) * 100;
	# 		$TmGCrev[$i][0][$iii][1] = sprintf ("%.2f", $TmGCrev[$i][0][$iii][1]);
	# 	}
	# 	for (my $iii = 18+$linker{$i}{2}; $iii < 25+$linker{$i}{2}; $iii++) {
	# 		$TmGCfor[$i][0][$iii][1] = ($Gfor[$i][0][$iii]+$Cfor[$i][0][$iii]) / (length $brfor[$i][0][$iii]) * 100;
	# 		$TmGCfor[$i][0][$iii][1] = sprintf ("%.2f", $TmGCfor[$i][0][$iii][1]);
	# 	}
	# }
	return (\@TmGCrev, \@TmGCfor);
}


sub Tm {
	my @brfor = @{$_[0]};
    my @brrev = @{$_[1]};
    my @TmGCfor = @{$_[2]};
    my @TmGCrev = @{$_[3]};
	my $sc = $_[4];
	my $pc = $_[5];
	my $n = $_[6];

	my %dH = (AA => -8.0, TT => -8.0, AT => -5.6, TA => -6.6, CA => -8.2, 
		  AC => -9.4, GT => -9.4, TG => -8.2, CT => -6.6, TC => -8.8, 
		  GA => -8.8, AG => -6.6, CG => -11.8, GC => -10.5, GG => -10.9, 
		  CC => -10.9);
		  	  
	my %dS = (AA => -21.9, TT => -21.9, AT => -15.2, TA => -18.4, CA => -21.0, 
		  AC => -25.5, GT => -25.5, TG => -21.0, CT => -16.4, TC => -23.5, 
		  GA => -23.5, AG => -16.4, CG => -29.0, GC => -26.4, GG => -28.4, 
		  CC => -28.4);
		
	my $RlnK = 1.987*(log(1/$pc));
	
	my $dimer;
	my $primer_dH = 0; 
	my $primer_dS = 0;

	for (my $i = 0; $i < $n; $i++) {
		for (my $iii = 18; $iii < 25; $iii++) {
			my $primer_dH = 0; 
			my $primer_dS = 0;				
			for (my $iiii = 0; $iiii < ((length $brrev[$i][0][$iii]) -1); $iiii++) {
				my $tempseq = reverse $brrev[$i][0][$iii];
				# my $tempseq = $brrev[$i][0][$iii];
				$dimer = substr ($tempseq, $iiii, 2);
				$primer_dH -= $dH{$dimer};
				$primer_dS -= $dS{$dimer};
			}
			
			$TmGCrev[$i][0][$iii][0] = ((1000*($primer_dH - 3.4) / ($primer_dS + $RlnK)) + 7.21 * log($sc))-272.9;
			$TmGCrev[$i][0][$iii][0] = sprintf ("%.1f", $TmGCrev[$i][0][$iii][0]);

			# print "rev $i $iii $TmGCrev[$i][0][$iii][0]\t$brrev[$i][0][$iii]\n";
		}

		for (my $iii = 18; $iii < 25; $iii++) {
			my $primer_dH = 0; 
			my $primer_dS = 0;			
			for (my $iiii = 0; $iiii < ((length $brfor[$i][0][$iii]) -1); $iiii++) {
				$dimer = substr ($brfor[$i][0][$iii], $iiii, 2);
				$primer_dH -= $dH{$dimer}; 
				$primer_dS -= $dS{$dimer};
			}
			
			$TmGCfor[$i][0][$iii][0] = ((1000*($primer_dH - 3.4) / ($primer_dS + $RlnK)) + 7.21 * log($sc))-272.9;
			$TmGCfor[$i][0][$iii][0] = sprintf ("%.1f", $TmGCfor[$i][0][$iii][0]);

			#print "for $i $iii $TmGCfor[$i][0][$iii][0]\t$brfor[$i][0][$iii]\n";
		}
	}
	return (\@TmGCrev, \@TmGCfor);
}


sub simpleTm {
	my $tempseq = $_[0];
	my $sc = $_[1];
	my $pc = $_[2];
	my $temptm;

	my @seqs;
	# if ($tempseq HAS NON-DNA CHARACTERS)

	my %dH = (AA => -8.0, TT => -8.0, AT => -5.6, TA => -6.6, CA => -8.2, 
		  AC => -9.4, GT => -9.4, TG => -8.2, CT => -6.6, TC => -8.8, 
		  GA => -8.8, AG => -6.6, CG => -11.8, GC => -10.5, GG => -10.9, 
		  CC => -10.9);
		  	  
	my %dS = (AA => -21.9, TT => -21.9, AT => -15.2, TA => -18.4, CA => -21.0, 
		  AC => -25.5, GT => -25.5, TG => -21.0, CT => -16.4, TC => -23.5, 
		  GA => -23.5, AG => -16.4, CG => -29.0, GC => -26.4, GG => -28.4, 
		  CC => -28.4);
		
	my $RlnK = 1.987*(log(1/$pc));
	
	my $dimer;
	my $primer_dH = 0; 
	my $primer_dS = 0;
					
	for (my $i = 0; $i < ((length $tempseq) -1); $i++) {
		$dimer = substr ($tempseq, $i, 2);
		$primer_dH -= $dH{$dimer};
		$primer_dS -= $dS{$dimer};
	}

	$temptm = ((1000*($primer_dH - 3.4) / ($primer_dS + $RlnK)) + 7.21 * log($sc))-272.9;
	$temptm = sprintf ("%.1f", $temptm);		

	return $temptm;
}

	
sub optbr {

    my @TmGCrev = @{$_[0]};
    my @TmGCfor = @{$_[1]}; 
	my $n = $_[2];

	my @optbr;
	my %primerTmwarning;
	for (my $i = 0; $i < $n; $i++) {
		my $counter = 0;
		for (my $rev = 18; $rev < 25; $rev++) {
			for (my $for = 18; $for < 25; $for++) {
				if (($TmGCrev[$i][0][$rev][0] - $TmGCfor[$i][0][$for][0]) <= 2 and 
				    ($TmGCrev[$i][0][$rev][0] - $TmGCfor[$i][0][$for][0]) >= -2) {
				    	$optbr[$i][0][$counter] = $rev;
					$optbr[$i][1][$counter] = $for;
					$counter++
				}
			}
		}

		if ($optbr[$i][0][0] eq "" and $optbr[$i][1][0] eq "") {
		
			$primerTmwarning{$i} = 1;
			
			my $mintemprev = $TmGCrev[$i][0][18][0];
			my $maxtemprev = $TmGCrev[$i][0][24][0];
			
			my $mintempfor = $TmGCfor[$i][0][18][0];
			my $maxtempfor = $TmGCfor[$i][0][24][0];
			
			if ($TmGCrev[$i][0][18][0] > $TmGCfor[$i][0][24][0]) {
				$optbr[$i][0][0] = 18;
				$optbr[$i][1][0] = 24;
				
				if (($TmGCrev[$i][0][18][0] - $TmGCfor[$i][0][23][0]) < 5) {
					$optbr[$i][0][1] = 18;
					$optbr[$i][1][1] = 23;
				}
				if (($TmGCrev[$i][0][18][0] - $TmGCfor[$i][0][22][0]) < 5) {
					$optbr[$i][0][2] = 18;
					$optbr[$i][1][2] = 22;
				}
			}
			elsif ($TmGCrev[$i][0][24][0] < $TmGCfor[$i][0][18][0]) {
				$optbr[$i][0][0] = 24;
				$optbr[$i][1][0] = 18;
				if (($TmGCfor[$i][0][19][0] - $TmGCrev[$i][0][24][0]) < 5) {
					$optbr[$i][0][1] = 24;
					$optbr[$i][1][1] = 19;
				}
				if (($TmGCfor[$i][0][20][0] - $TmGCrev[$i][0][24][0]) < 5) {
					$optbr[$i][0][2] = 24;
					$optbr[$i][1][2] = 20;
				}
			}
		}
	}
	return (\@optbr, \%primerTmwarning);
}


sub optbrTm {
    my @TmGCrev = @{$_[0]};
    my @TmGCfor = @{$_[1]};
    my $Tmtarget = $_[2];
	my $n = $_[3];

	my @optbr;
	my %primerTmwarning;



	###################################################################
	#If target Tm is "eq" (i.e. no specific target value, but Tm for 
	#all primers to be as close to each other as possible), the median
	#Tm for all possible binding regions is set as $Tmtarget


	if ($Tmtarget eq "eq") {
	
		my @Tmvalues;
	
		for (my $i = 0; $i < $n; $i++) {
			for (my $ii = 18; $ii < 25; $ii++) {
				push(@Tmvalues, $TmGCrev[$i][0][$ii][0]);
				push(@Tmvalues, $TmGCfor[$i][0][$ii][0]);
			}
		}
	
		my $Tmcount = scalar @Tmvalues;
		my @sortedTmvalues = sort { $a <=> $b } @Tmvalues;
	
		if ($Tmcount % 2) {
			$Tmtarget = $sortedTmvalues[int($Tmcount/2)];
		} 
		else {
			$Tmtarget = ($sortedTmvalues[$Tmcount/2] + $sortedTmvalues[$Tmcount/2 - 1]) / 2;
		}
	}


	###################################################################
	#The variable $Tmtarget is now set (either to median, or user
	#defined), and the optimal binding regions adapted to this Tm can
	#be stored in the array @optbr	
	
	
	for (my $i = 0; $i < $n; $i++) {
		my $smallestdiff = 1000;	#any value higher than the maximum difference between target Tm and Tm
		my $smallestdifflength;
		for (my $rev = 18; $rev < 25; $rev++) {
			my $current = $TmGCrev[$i][0][$rev][0] - $Tmtarget;
			$current =~ s/-//;
			if ($current < $smallestdiff) {
				$smallestdiff = $current;
				$smallestdifflength = $rev;
			}
		}
		$optbr[$i][0][0] = $smallestdifflength;
		
		my $smallestdiff = 1000;	#any value higher than the maximum difference between target Tm and Tm
		my $smallestdifflength;
		for (my $for = 18; $for < 25; $for++) {
			my $current = $TmGCfor[$i][0][$for][0] - $Tmtarget;
			$current =~ s/-//;
			if ($current < $smallestdiff) {
				$smallestdiff = $current;
				$smallestdifflength = $for;
			}
		}
		$optbr[$i][1][0] = $smallestdifflength;
			
	
	###################################################################
	#A warning flag is raised if the Tm for the primer pair is not 
	#within two degrees C of each other
	
	
		my $pairTmdiff = $TmGCrev[$i][0][$optbr[$i][0][0]][0] - $TmGCfor[$i][0][$optbr[$i][1][0]][0];
		$pairTmdiff =~ s/-//;
		
		if ($pairTmdiff > 2) {
			$primerTmwarning{$i} = 1;
		}	
	}
	# print "$Tmtarget\n";
	return (\@optbr, \%primerTmwarning, $Tmtarget);
}


sub primerdimer {

    my @brrev = @{$_[0]};
    my @brfor = @{$_[1]};
    my @optbr = @{$_[2]};
    my @TmGCfor = @{$_[3]};
    my @TmGCrev = @{$_[4]};
    my $n = $_[5];
    my $sc = $_[6];
    my $pc = $_[7];
	my %primerdimer;

	for (my $i = 0; $i < $n; $i++) {
		my @forfrags;
		my @revfrags;

		my $tempfrag = $brrev[$i][0][$optbr[$i][0][0]];
		$tempfrag =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		for (my $iii = 0; $iii <= length $tempfrag; $iii++) {
			for (my $iiii = $iii+5; $iiii <= (length $tempfrag)-$iii; $iiii++) {
				push (@forfrags, substr($tempfrag, $iii, $iiii));
			}
		}	
	
		$tempfrag = reverse $brrev[$i][0][$optbr[$i][0][0]];
		$tempfrag =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
		for (my $iii = 0; $iii <= length $tempfrag; $iii++) {
			for (my $iiii = $iii+5; $iiii <= (length $tempfrag)-$iii; $iiii++) {
				push (@revfrags, substr($tempfrag, $iii, $iiii));
			}
		}
		
		for (my $iii = 0; $iii < scalar @forfrags; $iii++) {
			if ($brfor[$i][0][$optbr[$i][1][0]] =~ m/$forfrags[$iii]/) {
				my $tempTm = &simpleTm($forfrags[$iii], $sc, $pc);
				if (($TmGCfor[$i][0][$optbr[$i][1][0]][0])-10 < $tempTm) {
					$primerdimer{$i}{0} = $iii;;
				}
			}
		}

		for (my $iii = 0; $iii < scalar @revfrags; $iii++) {
			if ($brfor[$i][0][$optbr[$i][1][0]] =~ m/$revfrags[$iii]/) {
				my $tempTm = &simpleTm($revfrags[$iii], $sc, $pc);
				if (($TmGCfor[$i][0][$optbr[$i][1][0]][0])-10 < $tempTm) {
					$primerdimer{$i}{0} = $iii;
				}
			}
		}
	}	
	return \%primerdimer;
}

	
sub homology {

    my @brrev = @{$_[0]};
    my @brfor = @{$_[1]};
    my @optbr = @{$_[2]};
    my @TmGCfor = @{$_[3]};
    my @TmGCrev = @{$_[4]};
    my $n = $_[5];
    my $sc = $_[6];
    my $pc = $_[7];
	my %homologyrev;
	my %homologyfor;
	my @revfrags;
	my @forfrags;

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii <= length $brrev[$i][0][$optbr[$i][0][0]]; $ii++) {
			for (my $iii = $ii+5; $iii <= (length $brrev[$i][0][$optbr[$i][0][0]])-$ii; $iii++) {
				my $tempfrag = substr($brrev[$i][0][$optbr[$i][0][0]], $ii, $iii);
				$tempfrag = reverse $tempfrag;
				$tempfrag =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				push (@revfrags, $tempfrag);
			}
		}
		
		for (my $ii = 0; $ii <= length $brfor[$i][0][$optbr[$i][1][0]]; $ii++) {
			for (my $iii = $ii+5; $iii <= (length $brfor[$i][0][$optbr[$i][1][0]])-$ii; $iii++) {
				my $tempfrag = substr($brfor[$i][0][$optbr[$i][1][0]], $ii, $iii);
				$tempfrag = reverse $tempfrag;
				$tempfrag =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
				push (@forfrags, $tempfrag);
			}
		}
		
		for (my $ii = 0; $ii < scalar @revfrags; $ii++) {
			if ($brrev[$i][0][$optbr[$i][0][0]] =~ m/$revfrags[$ii]/) {
				my $tempTm = &simpleTm($revfrags[$ii], $sc, $pc);
				if (($TmGCrev[$i][0][$optbr[$i][0][0]][0])-10 < $tempTm) {
					$homologyrev{$i}{0} = $ii;
				}
			}
		}
		
		for (my $ii = 0; $ii < scalar @forfrags; $ii++) {
			if ($brfor[$i][0][$optbr[$i][1][0]] =~ m/$forfrags[$ii]/) {
				my $tempTm = &simpleTm($forfrags[$ii], $sc, $pc);
				if (($TmGCfor[$i][0][$optbr[$i][1][0]][0])-10 < $tempTm) {
					$homologyfor{$i}{0} = $ii;
				}
			}
		}
	}
	return (\%homologyrev, \%homologyfor);	
}	

	
sub GCclamp {

    my @brrev = @{$_[0]};
    my @brfor = @{$_[1]};
    my @optbr = @{$_[2]};
    my $n = $_[3];
	my %GCclamprev;
	my %GCclampfor;

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
			$brrev[$i][0][$optbr[$i][0][$ii]] = reverse $brrev[$i][0][$optbr[$i][0][$ii]]; 
			my $temp = substr($brrev[$i][0][$optbr[$i][0][$ii]], length ($brrev[$i][0][$optbr[$i][0][$ii]])-5, 5);
			if ($temp =~ m/[C,G]/g) {
				$GCclamprev{$i}{$ii} = 1;
			}
			$brrev[$i][0][$optbr[$i][0][$ii]] = reverse $brrev[$i][0][$optbr[$i][0][$ii]];
		}
	}

	for (my $i = 0; $i < $n; $i++) { 
		for (my $ii = 0; $ii < $#{$optbr[$i][1]}; $ii++) {
			my $temp = substr($brfor[$i][0][$optbr[$i][1][$ii]], length ($brfor[$i][0][$optbr[$i][1][$ii]])-5, 5);
			if ($temp =~ m/[C,G]/g) {
				$GCclampfor{$i}{$ii} = 1;
			}
		}
	}
	return (\%GCclamprev, \%GCclampfor);	
}
	

sub GCcountclamp {

    my @brrev = @{$_[0]};
    my @brfor = @{$_[1]};
    my @optbr = @{$_[2]};
    my $n = $_[3];
	my %GCcountclamprev;
	my %GCcountclampfor;
	my $count = 0;

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
			$brrev[$i][0][$optbr[$i][0][$ii]] = reverse $brrev[$i][0][$optbr[$i][0][$ii]];
			my $temp = substr($brrev[$i][0][$optbr[$i][0][$ii]], length ($brrev[$i][0][$optbr[$i][0][$ii]])-5, 5);
			for (my $iii = 0; $iii < 6; $iii++) {
				if (substr ($temp, $iii, 1) =~ m/[C,G]/) {
					$count++
				}
			}
			if ($count > 2) {
				$GCcountclamprev{$i}{$ii} = 1;
			}
			$brrev[$i][0][$optbr[$i][0][$ii]] = reverse $brrev[$i][0][$optbr[$i][0][$ii]];
			$brrev[$i][0][$optbr[$i][0][$ii]] =~ tr/ATGCRYKMBVDH/TACGYRMKVBHD/;
			$count = 0;
		}
	}

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii < $#{$optbr[$i][1]}; $ii++) {
			my $temp = substr($brfor[$i][0][$optbr[$i][1][$ii]], length ($brfor[$i][0][$optbr[$i][1][$ii]])-5, 5);
			for (my $iii = 0; $iii < length $temp; $iii++) {
				if (substr ($temp, $iii, 1) =~ m/[C,G]/) {
					$count++
				}
			}
			if ($count > 2) {
				$GCcountclampfor{$i}{$ii} = 1;
			}
			$count = 0;
		}
	}
	return (\%GCcountclamprev, \%GCcountclampfor);
}


sub polyN {

    my @brrev = @{$_[0]};
    my @brfor = @{$_[1]};
    my @optbr = @{$_[2]};
    my $n = $_[3];
	my %polyNrev;
	my %polyNfor;

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
			if ($brrev[$i][0][$optbr[$i][0][$ii]] =~ m/[G]{4}/ or $brrev[$i][0][$optbr[$i][0][$ii]] =~ m/[C]{4}/ or $brrev[$i][0][$optbr[$i][0][$ii]] =~ m/[A]{4}/ or $brrev[$i][0][$optbr[$i][0][$ii]] =~ m/[T]{4}/) {
				$polyNrev{$i}{$ii} = 1;
			}
		}
	}

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii < $#{$optbr[$i][1]}; $ii++) {
			if ($brfor[$i][0][$optbr[$i][1][$ii]] =~ m/[G]{4}/ or $brfor[$i][0][$optbr[$i][1][$ii]] =~ m/[C]{4}/ or $brfor[$i][0][$optbr[$i][1][$ii]] =~ m/[A]{4}/ or $brfor[$i][0][$optbr[$i][1][$ii]] =~ m/[T]{4}/) {
				$polyNfor{$i}{$ii} = 1;
			}
		}
	}
	return (\%polyNrev, \%polyNfor);
}


sub optbranalysis {

    my @optbr = @{$_[0]};
	my @TmGCrev = @{$_[1]};
    my @TmGCfor = @{$_[2]};
    my %primerdimer = %{$_[3]};
    my %homologyrev = %{$_[4]};
    my %homologyfor = %{$_[5]};
    my %GCclamprev = %{$_[6]};
    my %GCclampfor = %{$_[7]};
    my %GCcountclamprev = %{$_[8]};
    my %GCcountclampfor = %{$_[9]};
    my %polyNrev = %{$_[10]};
    my %polyNfor = %{$_[11]};
    my %ranking = %{$_[12]};
    my $n = $_[13];
    my %penalty;

	for (my $i = 0; $i < $n; $i++) {
		for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
			$penalty{$i}{$ii} = 0;
			unless (55.1 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{$ii}]][0] and 72.1 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{$ii}]][0]) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 5;
				#print "$i $ii Tm rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			unless (50 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{$ii}]][0] and 77 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{$ii}]][0]) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 4;
				#print "$i $ii Tm rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			unless (55.1 < $TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{$ii}]][0] and 72.1 > $TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{$ii}]][0]) {
				$penalty{$i}{$ii}++;
				#print "$i $ii Tm for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
			unless (50 < $TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{$ii}]][0] and 77 > $TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{$ii}]][0]) {
				$penalty{$i}{$ii}++;
				#print "$i $ii Tm for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
			
			unless (39.9 < $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1] and 60.1 > $TmGCrev[$i][0][$optbr[$i][0][$ranking{$i}{0}]][1]) {
				$penalty{$i}{$ii}++;
				#print "$i $ii GC rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			unless (39.9 < $TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][1] and 60.1 > $TmGCfor[$i][0][$optbr[$i][1][$ranking{$i}{0}]][1]) {
				$penalty{$i}{$ii}++;
				#print "$i $ii GC for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
			
			if (exists $primerdimer{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 3;
				#print "$i $ii primer dimer! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			if (exists $homologyrev{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 6;
				#print "$i $ii hom rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			if (exists $homologyfor{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 6;
				#print "$i $ii hom for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
			unless (exists $GCclamprev{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 2;
				#print "$i $ii GC clamp rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			unless (exists $GCclampfor{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 2;
				#print "$i $ii GC clamp for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
			if (exists $GCcountclamprev{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 7;
				#print "$i $ii GC count clamp rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			if (exists $GCcountclampfor{$i}{$ii}) {
				$penalty{$i}{$ii} = $penalty{$i}{$ii} + 7;
				#print "$i $ii GC count clamp for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
			if (exists $polyNrev{$i}{$ii}) {
				$penalty{$i}{$ii}++;
				#print "$i $ii polyN rev! length: $optbr[$i][0][$ranking{$i}{$ii}]\n";
			}
			if (exists $polyNfor{$i}{$ii}) {
				$penalty{$i}{$ii}++;
				#print "$i $ii polyN for! length: $optbr[$i][1][$ranking{$i}{$ii}]\n";
			}
		}
	}
	
	my %rank;
	for (my $i = 0; $i < $n; $i++) {
		my $ranking = 0;
		for (my $score = 0; $score < 10; $score++) {
			
			for (my $ii = 0; $ii < $#{$optbr[$i][0]}; $ii++) {
				
				if ($penalty{$i}{$ii} == $score) {
					$rank{$i}{$ranking} = $ii;
					#print "ranking: $ranking gene: $i optimal Tm pair: $rank{$i}{$ranking} penalty: $score\n";
					$ranking++;
				}
			}
		}
	}
	return \%rank;
}


sub htmlprint {
	
	my @outreportarray = @{$_[0]};
	my @fastaoutarray = @{$_[1]};
	my $batchinput = $_[2];
	my $x = 0;
	my $tableflag = 0;
	if ($batchinput eq "TRUE") {
		$x = $_[3];
	}
	my @htmlarray;
	my %htmlcolor;
	$htmlcolor{0} = "#99cccc";
	$htmlcolor{1} = "#cc9999";
	$htmlcolor{2} = "#99cc66";
	$htmlcolor{3} = "#6699cc";
	$htmlcolor{4} = "#ffcc66";
	$htmlcolor{5} = "#9999cc";
	$htmlcolor{6} = "#66cccc";
	$htmlcolor{7} = "#cccc99";
	my $htmlcount = 0;

	push(@{$htmlarray[$x]}, "<font size=2 face=\"courier new\">\n");
	
	for (my $i = 0; $i < scalar @{$outreportarray[$x]}; $i++) {
		my $temp = $outreportarray[$x][$i];
	
		if ($outreportarray[$x][$i] =~ m/(AMUSER .*)/) {
			$temp = "<b>$1</b>\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(output generated: .+)/) {
			$temp = "<b>$1</b>\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(input parameters:)/) {
			$temp = "<b>$1</b>\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(overview of the needed primers \(5'-3'\):)/) {
			$temp = "<b>$1</b>\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(primer details for .+)/) {
			$temp = "<b>$1</b>\n\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(primer details:)/) {
			$temp = "<b>$1</b><br>\n";
			push(@{$htmlarray[$x]}, $temp);
			$i++;
			push(@{$htmlarray[$x]}, "$outreportarray[$x][$i]<br>\n");
			$temp = "click <a href=\"http://www.cbs.dtu.dk/services/AMUSER/instructions.php#primereval\" target=\"_blank\">here</a> for detailed descriptions of primer evaluation parameters<br>\n\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(\* Tm: (.+)C - in optimal range \(55-72\)\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#347C17\">...YES</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\* Tm: (.+)C - in optimal range \(55-72\)\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#C11B17\">...NO</font></b><br>";
		}
	
		if ($outreportarray[$x][$i] =~ m/(\* GC content: (.+)% - in optimal range \(40-60\)\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#347C17\">...YES</font></b><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\* GC content: (.+)% - in optimal range \(40-60\)\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#C11B17\">...NO</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\* GC clamp present at 3' end\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#347C17\">...YES</font></b><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\* GC clamp present at 3' end\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#C11B17\">...NO</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\* more than 3 G\/C out of last 5 bases at 3' end\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#347C17\">...NO</font></b><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\* more than 3 G\/C out of last 5 bases at 3' end\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#C11B17\">...YES</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\* risk of primer dimer formation in primer pair\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#347C17\">...NO</font></b><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\* risk of primer dimer formation in primer pair\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#C11B17\">...YES</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\* risk of intra-primer homology \(secondary structures\)\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#347C17\">...NO</font></b><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\* risk of intra-primer homology \(secondary structures\)\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#C11B17\">...YES</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\* presence of polyN stretches\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#347C17\">...NO</font></b><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\* presence of polyN stretches\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#C11B17\">...YES</font></b><br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/(\Tm of primers within 2C of each other\?\s+)...YES/) {
			$temp = "$1<b><font color=\"#347C17\">...YES</font></b><br><br>";
		}
		if ($outreportarray[$x][$i] =~ m/(\Tm of primers within 2C of each other\?\s+)...NO/) {
			$temp = "$1<b><font color=\"#C11B17\">...NO</font><br><br></b>";
		}
	
		if ($outreportarray[$x][$i] =~ m/(please see "primer details" section)/) {
			$temp = "<i>$1</i>\n\n\n";
		}
	
		if ($outreportarray[$x][$i] =~ m/(overview of your final construct after cloning.*:)/) {
			if ($tableflag == 0) {
				push(@{$htmlarray[$x]}, "</table>");
			}
			$temp = "<b>$1</b><br>";
			push(@{$htmlarray[$x]}, $temp);
			$i++;
			$temp = $outreportarray[$x][$i];
			$temp =~ s/\n/<br>/g;
			push(@{$htmlarray[$x]}, $temp);
			$i++;
			my @fragmentnames = split (",,", $outreportarray[$x][$i]);
			my $html = 0;
			for (my $ii = 0; $ii < scalar @fragmentnames; $ii++) {
				unless ($fragmentnames[$ii] eq "") {
					push(@{$htmlarray[$x]}, "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">&nbsp;$fragmentnames[$ii]&nbsp;</FONT>");
					if ($html+1 < keys %htmlcolor) {
						$html++;
					}
					else {
						$html = 0;
					}
				}
			}
			push(@{$htmlarray[$x]}, "<br><br><br>\n");
			$i++;
			$temp = $outreportarray[$x][$i];
		}
	
		if ($outreportarray[$x][$i] =~ m/(details of final construct after cloning \(.*length: \d+ bases\):)/) {
			$temp = "<b>$1</b><br>";
			push(@{$htmlarray[$x]}, $temp);
			$i++;
			$temp = $outreportarray[$x][$i];
			$temp =~ s/\n/<br>/g;
			push(@{$htmlarray[$x]}, $temp);
			$i++;
			my @fragmentnames = split (",,", $outreportarray[$x][$i]);
			my $html = 0;
			for (my $ii = 0; $ii < scalar @fragmentnames; $ii++) {
				unless ($fragmentnames[$ii] eq "") {
					push(@{$htmlarray[$x]}, "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">&nbsp;$fragmentnames[$ii]&nbsp;</FONT>");
					if ($html+1 < keys %htmlcolor) {
						$html++;
					}
					else {
						$html = 0;
					}
				}
			}
			push(@{$htmlarray[$x]}, "<br><br><br>\n");
			$i++; $temp = $outreportarray[$x][$i];
	
			$html = 0;
			my $case = "u";
			my $numbering;
			my $tempseq;
			my $totalnumbering = "";
			my $totalseq = "";
			while ($outreportarray[$x][$i] ne "") {
				if ($outreportarray[$x][$i] =~ m/(\d*\s+)(.*)/) {
					$numbering = $1;
					$tempseq = $2;
				}
				my $temp = "";

				my @line;
				for (my $i = 0; $i < length $tempseq; $i++) {
					my $uc = "";
					while (defined $tempseq and substr($tempseq, $i, 1) =~ m/[A-Z]/) {
						$uc .= substr($tempseq, $i, 1);
						$i++;
					}
					unless ($uc eq "") {
						push(@line, $uc);
					}
					
					my $lc = "";
					while (defined $tempseq and substr($tempseq, $i, 1) =~ m/[a-z]/) {
						$lc .= substr($tempseq, $i, 1);
						$i++;
					}
					unless ($lc eq "") {
						push(@line, $lc);
					}
					
					$i--;
				}

				for (my $i = 0; $i < scalar @line; $i++) {
					$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$line[$i]</FONT>";
					unless ($i == (scalar @line)-1) {
						if ($html+1 < keys %htmlcolor) {
							$html++;
						}
						else {
							$html = 0;
						}
					}
				}
				$temp = uc $temp;
				$totalseq .= "$temp<br>";
				$totalnumbering .= "$numbering<br>";

				$i++;
			}
			push(@{$htmlarray[$x]}, "<table>");
			push(@{$htmlarray[$x]}, "<tr><td><font size=2 face=\"courier new\">$totalnumbering</font></td>");
			push(@{$htmlarray[$x]}, "<td>&nbsp;&nbsp</td>");
			push(@{$htmlarray[$x]}, "<td><font size=2 face=\"courier new\">$totalseq</font></td></tr>");
			push(@{$htmlarray[$x]}, "</table>\n");
			$temp = $outreportarray[$x][$i];
		}


				
		# 		my $ustring = "";
		# 		my $lstring = "";
				
		# 		my $ii;
		# 		my $iii;

		# 		my $temptotal = $numbering;
		# 		my $case = "u";
		# 		my @templine;
		# 		my $elem = 0;
		# 		for ($ii = 0; $ii < 61; $ii++) {
		# 			if (substr($tempseq, $ii, 1) =~ m/[ATGC]/) {
		# 				while (substr($tempseq, $ii, 1) =~ m/[ATGC]/ and $ii < 61) {
		# 					@templine[$elem] .= substr($tempseq, $ii, 1);
		# 					$ii++;
		# 				}
		# 			}
		# 				for ($ii; $ii < 61; $ii++) {
		# 					$temppart .= substr($tempseq, $ii, 1);
		# 					$ii++;
		# 				}
		# 				$temptotal .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$temppart</FONT>";
		# 				if ($case eq "l") {	
		# 					if ($html+1 < keys %htmlcolor) {
		# 						$html++;
		# 					}
		# 					else {
		# 						$html = 0;
		# 					}
		# 				}
		# 				$case = "u";
		# 			}



		# 			if (substr($tempseq, $ii, 1) =~ m/[atgc]/) {
		# 				my $temppart = "";
		# 				while (substr($tempseq, $ii, 1) =~ m/[atgc]/ and $ii < 61) {
		# 					$temppart .= substr($tempseq, $ii, 1);
		# 					$ii++;
		# 				}
		# 				$temptotal .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$temppart</FONT>";
		# 				if ($case eq "u") {
		# 					if ($html+1 < keys %htmlcolor) {
		# 						$html++;
		# 					}
		# 					else {
		# 						$html = 0;
		# 					}
		# 				}
		# 				$case = "l";
		# 			}
		# 			$ii--;
		# 		}
		# 		$temptotal =~ s/\s\s/&nbsp;&nbsp;/g;
		# 		push(@{$htmlarray[$x]}, "$temptotal<br>");

		# 		$i++; $temp = $outreportarray[$x][$i];
		# 	}
		# }
		# 		if ($case eq "u") {
		# 			for ($ii = 0; $ii < 61; $ii++) {
		# 				if (substr($tempseq, $ii, 1) =~ m/[ATGC]/) {
		# 					$ustring .= substr($tempseq, $ii, 1);
		# 				}
		# 				elsif (substr($tempseq, $ii, 1) =~ m/[atgc]/) {
		# 					$iii = $ii;
		# 					$ii = 62;
		# 					$case = "l";
		# 				}
		# 			}
					
		# 			for ($iii = $iii; $iii < 61; $iii++) {
		# 				if (substr($tempseq, $iii, 1) =~ m/[atgc]/) {
		# 					$lstring .= substr($tempseq, $iii, 1);
		# 				}
		# 				elsif (substr($tempseq, $iii, 1) =~ m/[ATGC]/) {
		# 					$iii = 62;
		# 				}
		# 			}
					
		# 			unless ($ustring eq "") {
		# 				$temp = "$numbering<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$ustring</FONT>";
		# 				if ($lstring ne "") {
		# 					if ($html+1 < keys %htmlcolor) {
		# 						$html++;
		# 					}
		# 					else {
		# 						$html = 0;
		# 					}
		# 				}
		# 			}
						
		# 			unless ($lstring eq "") {
		# 				$lstring = uc $lstring;
		# 				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$lstring</FONT>";
		# 				$case = "l";
		# 			}
		# 		}
				
		# 		elsif ($case eq "l") {
		# 			for ($ii = 0; $ii < 61; $ii++) {
		# 				if (substr($tempseq, $ii, 1) =~ m/[atgc]/) {
		# 					$lstring .= substr($tempseq, $ii, 1);
		# 				}
		# 				elsif (substr($tempseq, $ii, 1) =~ m/[ATGC]/) {
		# 					$iii = $ii;
		# 					$ii = 62;
		# 					$case = "u";
		# 				}
		# 			}
					
		# 			for ($iii = $iii; $iii < 61; $iii++) {
		# 				if (substr($tempseq, $iii, 1) =~ m/[ATGC]/) {
		# 					$ustring .= substr($tempseq, $iii, 1);
		# 				}
		# 				elsif (substr($tempseq, $iii, 1) =~ m/[atgc]/) {
		# 					$iii = 62;
		# 				}
		# 			}
						
		# 			unless ($lstring eq "") {
		# 				$lstring = uc $lstring;
		# 				$temp = "$numbering<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$lstring</FONT>";
		# 				if ($ustring ne "") {
		# 					if ($html+1 < keys %htmlcolor) {
		# 						$html++;
		# 					}
		# 					else {
		# 						$html = 0;
		# 					}
		# 				}
		# 			}
		# 			unless ($ustring eq "") {
		# 				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$html}\">$ustring</FONT>";
		# 				$case = "u";
		# 			}
		# 		}			
				
		# 		$temp =~ s/\s\s/&nbsp;&nbsp;/g;
		# 		push(@{$htmlarray[$x]}, "$temp<br>");
		# 		$i++; $temp = $outreportarray[$x][$i];
		# 	}
		# }
	
		if ($outreportarray[$x][$i] =~ m/(graphic overview of DNA fragments and primers:)/) {
			$temp = "<b>$1</b>\n";

		}

		# if ($outreportarray[$x][$i] =~ m/forward primer for (.+):/) {
		# 	$temp = "forward primer for <b>$1</b>:<br><br>";
		# }

		# if ($outreportarray[$x][$i] =~ m/reverse primer for (.+):/) {
		# 	$temp = "reverse primer for <b>$1</b>:<br><br>";
		# }		

		if ($outreportarray[$x][$i] =~ m/fragment\tstrand\ttm\tprimer/) {
			push(@{$htmlarray[$x]} ,"<table><tr><td><font size=2 face=\"courier new\"><b>fragment</b></font></td><td>&nbsp;&nbsp;&nbsp;</td><td><font size=2 face=\"courier new\"><b>strand</b></font></td><td>&nbsp;&nbsp;&nbsp;</td><td><font size=2 face=\"courier new\"><b>tm</b></font></td><td>&nbsp;&nbsp;&nbsp;</td><td><font size=2 face=\"courier new\"><b>primer</b></font></td></tr>");
			$i++;
			if ($outreportarray[$x][$i] =~ m/(.+)\t(.+)\t(.+)\t(.+)/) {
				my $fragments = "";
				my $strands = "";
				my $tms = "";
				my $primers = "";
				while ($outreportarray[$x][$i] =~ m/(.+)\t(.+)\t(.+)\t(.+)/) {
					$fragments .= "$1<br>";
					$strands .= "$2<br>";
					$tms .= "$3<br>";
					$primers .= "$4<br>";
					$i++;
				}
				push(@{$htmlarray[$x]}, "<tr><td><font size=2 face=\"courier new\">$fragments</font></td><td></td><td><font size=2 face=\"courier new\">$strands</font></td><td></td><td><font size=2 face=\"courier new\">$tms</font></td><td></td><td><font size=2 face=\"courier new\">$primers</font></td></tr>");
			}
		}	

		if ($outreportarray[$x][$i] =~ m/(attention: one or more of the designed primers may have undesirable properties)/) {
			push (@{$htmlarray[$x]}, "</table>");
			$temp = "<br><i>$1</i>\n";
			$tableflag = 1;
		}

		# if ($outreportarray[$x][$i] =~ m/forward primer for (.+):(.+)/) {
		# 	$temp = "<tr><td><font size=2 face=\"courier new\">$1</font></td><td><font size=2 face=\"courier new\">forward</font></td><td><font size=2 face=\"courier new\">tm</font></td><td><font size=2 face=\"courier new\">$2</font></td></tr>";
		# }

		# if ($outreportarray[$x][$i] =~ m/reverse primer for (.+):(.+)/) {
		# 	$temp = "<tr><td><font size=2 face=\"courier new\">$1</font></td><td><font size=2 face=\"courier new\">reverse</font></td><td><font size=2 face=\"courier new\">tm</font></td><td><font size=2 face=\"courier new\">$2</font></td></tr>";
		# }
	
		if ($outreportarray[$x][$i] =~ m/fusion region and forward primer for joining of (.+) and (.+):/) {
			$temp = "fusion region and forward primer for joining of <b>$1</b> and <b>$2</b>:<br><br>";
		}

		if ($outreportarray[$x][$i] =~ m/(\s*5'-\w+)U(\w*)/) {
			$temp = $1;
			$temp .= "<b>U</b>";
			$temp .= "$2<br>";
		}
		
		if ($outreportarray[$x][$i] =~ m/fusion region and reverse primer for joining of (.+) and (.+):/) {
			$temp = "fusion region and reverse primer for joining of <b>$1</b> and <b>$2</b>:<br><br>";
		}

		if ($outreportarray[$x][$i] =~ m/(\s+\w*)U(\w+-5')/) {
			$temp = $1;
			$temp .= "<b>U</b>";
			$temp .= "$2<br>";
		}
	
		if ($outreportarray[$x][$i] =~ m/5'-(\w+)\[\.\.\.\]-3'/) {
			$htmlcount = 0;
			my $tempseq = $1;
			my $tempseq1 = substr ($tempseq, 0, (length $cassette[2]) + (length $cassette[5]));
			my $tempseq2 = substr ($tempseq, (length $cassette[2]) + (length $cassette[5]), length $primerextension[$x][0][4]);
			my $tempseq3 = substr ($tempseq, (length $cassette[2]) + (length $cassette[5]) + (length $primerextension[$x][0][4]), 50);

			$temp = "5'-";
			if ($tempseq1 ne "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq1</font>";
				if ($htmlcount+1 < keys %htmlcolor) {
					$htmlcount++;
				}
				else {
					$htmlcount = 0;
				}
			}
			if ($tempseq2 ne "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq2</font>";
				if ($htmlcount+1 < keys %htmlcolor) {
					$htmlcount++;
				}
				else {
					$htmlcount = 0;
				}
			}
			if ($tempseq3 ne "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq3</font>[...]-3'<br><br>";
			}

			# unless ($nocassette eq "TRUE") {
			# 	$temp = "5'-<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq1</font>";
			# 	if ($htmlcount+1 < keys %htmlcolor) {
			# 		$htmlcount++;
			# 	}
			# 	else {
			# 		$htmlcount = 0;
			# 	}
			# 	$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq3</font>[...]-3'<br><br>";
			# }
			# else {
			# 	$temp = "5'-<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq3</font>[...]-3'<br><br>";
			# }
		}
	
		if ($outreportarray[$x][$i] =~ m/5'-\[\.\.\.\](\w+)\[\.\.\.\]-3'/) {
			my $tempseq = $1;
			# my $linker = "";
			my $tempseq1 = substr ($tempseq, 0, 50);
			# if ((length $tempseq) > 80) {
			# 	$linker = substr ($tempseq, 40, (length $tempseq) - 80);
			# }
			my $tempseq2 = "";
			if (length $tempseq > 100) {
				$tempseq2 = substr ($tempseq, 50, (length $tempseq)-100);				
			}
			my $tempseq3 = substr ($tempseq, (length $tempseq)-50, 50);
			$temp = "5'-[...]<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq1</font>";
			if ($htmlcount+1 < keys %htmlcolor) {
				$htmlcount++;
			}
			else {
				$htmlcount = 0;
			}
			# unless ($linker eq "") {
			# 	$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$linker</font>";
			# 	if ($htmlcount+1 < keys %htmlcolor) {
			# 		$htmlcount++;
			# 	}
			# 	else {
			# 		$htmlcount = 0;
			# 	}
			# }
			unless ($tempseq2 eq "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq2</font>";
				if ($htmlcount+1 < keys %htmlcolor) {
					$htmlcount++;
				}
				else {
					$htmlcount = 0;
				}
			}
			$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq3</font>[...]-3'<br>";
		}
	
		if ($outreportarray[$x][$i] =~ m/5'-\[\.\.\.\](\w+)-3'/) {
			my $tempseq = $1;
			my $tempseq1 = substr ($tempseq, 0, 50);
			my $tempseq2 = substr ($tempseq, 50, length $primerextension[$x][-1][1]);
			my $tempseq3 = substr ($tempseq, 50 + (length $primerextension[$x][-1][1]), (length $cassette[3]) + (length $cassette[6]));

			$temp = "5'-[...]";
			if ($tempseq1 ne "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq1</font>";
				if ($htmlcount+1 < keys %htmlcolor) {
					$htmlcount++;
				}
				else {
					$htmlcount = 0;
				}
			}
			if ($tempseq2 ne "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq2</font>";
				if ($htmlcount+1 < keys %htmlcolor) {
					$htmlcount++;
				}
				else {
					$htmlcount = 0;
				}
			}
			if ($tempseq3 ne "") {
				$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq3</font>";
			}
			$temp .= "-3'<br>";


			# my $tempseq = $1;
			# my $tempseq1 = substr ($tempseq, 0, 40);
			# # if ((length $tempseq) > 80) {
			# # 	$linker = substr ($tempseq, 40, (length $tempseq) - 80);
			# # }
			# my $tempseq2 = "";
			# if (length $tempseq > 80) {
			# 	$tempseq2 = substr ($tempseq, 40, (length $tempseq)-80);				
			# }
			# my $tempseq3 = substr ($tempseq, (length $tempseq)-40, 40);
			# $temp = "5'-[...]<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq1</font>";
			# if ($htmlcount+1 < keys %htmlcolor) {
			# 	$htmlcount++;
			# }
			# else {
			# 	$htmlcount = 0;
			# }
			# # unless ($linker eq "") {
			# # 	$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$linker</font>";
			# # 	if ($htmlcount+1 < keys %htmlcolor) {
			# # 		$htmlcount++;
			# # 	}
			# # 	else {
			# # 		$htmlcount = 0;
			# # 	}
			# # }
			# unless ($tempseq2 eq "") {
			# 	$temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq2</font>";
			# 	if ($htmlcount+1 < keys %htmlcolor) {
			# 		$htmlcount++;
			# 	}
			# 	else {
			# 		$htmlcount = 0;
			# 	}
			# }
			# $temp .= "<FONT style=\"BACKGROUND-COLOR: $htmlcolor{$htmlcount}\">$tempseq3</font>[...]-3'<br>";
		}

		if ($outreportarray[$x][$i] =~ m/fusion region and related primers for joining of (.+) and (.+):/) {
			$temp = "fusion region and related primers for joining of <b>$1</b> and <b>$2</b>:<br><br>";
		}

	
		$temp =~ s/\n/<br>/g;
		$temp =~ s/\s\s/&nbsp;&nbsp;/g;
		push(@{$htmlarray[$x]},  "$temp\n");
	}

	# unless ($batchinput eq "TRUE") {
	# 	push(@{$htmlarray[$x]},  "<br><br><b>primers in FASTA format (5'-3')</b><br>");
	# 	push(@{$htmlarray[$x]},  "-------------------------------<br><br>");
	# 	for (my $i = 0; $i < scalar @{$fastaoutarray[0]}; $i++) {
	# 		my $temp = $fastaoutarray[$x][$i];
	# 		$temp =~ s/\n/<br>/g;
	# 		push(@{$htmlarray[$x]},  "$temp");
	# 	}
	# }

	return \@htmlarray;
}

sub htmlprintbatch {
	my @fastaoutarray = @{$_[0]};
	my @fastabatcharray = @{$_[1]};
	my @htmlarray;
	
	push (@htmlarray, "<font size=2 face=\"courier new\">\n");
	push (@htmlarray, "--------------------------------------<br>\n");
	push (@htmlarray, "<b>AMUSER $version</b><br>\n");
	push (@htmlarray, "<b>output generated: $mday-$mon-$year $hour:$min:$sec</b><br>\n");
	push (@htmlarray, "--------------------------------------<br><br>\n");
	push (@htmlarray, "<b>input parameters:</b><br>\n");
	push (@htmlarray, "<b>-----------------</b><br>\n");
	push (@htmlarray, "number of batches: $numberofinputs<br>\n");
	$cassetteprint =~ s/\n/<br>/g;
	push (@htmlarray, "$cassetteprint<br><br><br>\n");
	push (@htmlarray, "<b>overview of the needed primers (5'-3'):</b><br>");
	push (@htmlarray, "<b>---------------------------------------</b><br><br>");

	push (@htmlarray, "<table>\n");
	push (@htmlarray, "<tr><td><b><font size=2 face=\"courier new\">description</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><b><font size=2 face=\"courier new\">name</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><b><font size=2 face=\"courier new\">strand</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><b><font size=2 face=\"courier new\">tm</b></td><td>&nbsp;&nbsp;&nbsp;</td><td><b><font size=2 face=\"courier new\">primer</b></td><td>&nbsp;&nbsp;&nbsp;</td></td><td><b><font size=2 face=\"courier new\">details for batch</b></td></td></tr>\n");	


	# my $temp = $fastabatcharray[0][0];
	# if ($temp =~ m/(.+)\t(.+)\t(.+)\t(.+)\t(.+)/) {
	# 	my $fragment = $1;
	# 	my $strand = $2;
	# 	my $tm = $3;
	# 	my $primer = $4;
	# 	push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">backbone</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td></td></tr>\n");	
	# }
	# my $temp = $fastabatcharray[0][1];
	# if ($temp =~ m/(.+)\t(.+)\t(.+)\t(.+)\t(.+)/) {
	# 	my $fragment = $1;
	# 	my $strand = $2;
	# 	my $tm = $3;
	# 	my $primer = $4;
	# 	push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">backbone</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td></td></tr>\n");	
	# }

	# for (my $i = 2; $i < scalar @{$fastabatcharray[0]}; $i++) {
	# 	my $temp = $fastabatcharray[0][$i];
	# 	$temp =~ s/\n/<br>/g;
	# 	push (@htmlarray, "$temp\n");
	# }
	# for (my $i = 0; $i < scalar @inputs; $i++) {
	# 	my $batchno = $i+1;
	# 	# push (@htmlarray, "<b>forward and reverse primers for insert in batch $batchno ");
	# 	# push (@htmlarray, "<a href=\"batch$i.report.html\" target=\"_blank\">details</a>");
	# 	push (@htmlarray, "</b>");
		# my $i = 0;
		my $batchnumber = 0;
		my $tempcounter = 0;
		for (my $ii = 0; $ii < scalar @fastabatcharray; $ii++) {
			my $temp = $fastabatcharray[$ii];
			#$temp =~ s/\n/<br>/g;
			if ($temp =~ m/(.+)\t(.+)\t(.+)\t(.+)\t(.+)/) {
				my $batch = $1;
				my $fragment = $2;
				my $strand = $3;
				my $tm = $4;
				my $primer = $5;
				my $batchnumberprint = $batchnumber+1;
				if ($batch =~ m/backbone/) {
					push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td></td></tr>\n");	
				}
				else {
					push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td><font size=2 face=\"courier new\"><a href=\"$outputurl/batch$batchnumber.report.html\" target=\"_blank\">batch $batchnumberprint</a></td></tr>\n");
					if ($tempcounter == 1) {
						$batchnumber++;
						$tempcounter = 0;
					}
					else {
						$tempcounter++;
					}
				}



				# if ($ii < 2) {
				# 	push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td></td></tr>\n");	
				# }
				# elsif ($ii > 1 and $ii < (scalar @fastabatcharray)-2) {
				# 	if ($ii % 2 == 0) {
				# 		my $batchnumberprint = $batchnumber+1;
				# 		push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td><font size=2 face=\"courier new\"><a href=\"./batch$batchnumber.report.html\" target=\"_blank\">batch $batchnumberprint</a></td></tr>\n");
				# 		$batchnumber++;
				# 	}
				# 	else {
				# 		push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td></td></tr>\n");
				# 	}
				# }
				# elsif ($ii > (scalar @fastabatcharray)-3) {
				# 	if ($backbone == 2) {
				# 		if ($ii % 2 == 0) {
				# 			my $batchnumberprint = $batchnumber+1;
				# 			push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td><font size=2 face=\"courier new\"><a href=\"./batch$batchnumber.report.html\" target=\"_blank\">batch $batchnumberprint</a></td></tr>\n");		
				# 		}
				# 	}	
				# 	push (@htmlarray, "<tr><td><font size=2 face=\"courier new\">$batch</td><td></td><td><font size=2 face=\"courier new\">$fragment</td><td></td><td><font size=2 face=\"courier new\">$strand</td><td></td><td><font size=2 face=\"courier new\">$tm</td><td></td><td><font size=2 face=\"courier new\">$primer</td><td></td><td></td></tr>\n");	
				# }
			}
		}
		#push (@htmlarray, "<br>");
	# }
	push (@htmlarray, "</table>\n");
	return \@htmlarray;
}




close OUTFRED;