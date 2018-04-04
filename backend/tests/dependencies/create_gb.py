from Bio import SeqIO
import os


def get_gb_file_path(gb='test_genbank.gbk'):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_path = dir_path + "/" + gb
    return file_path


def get_gb_object(gb='test_genbank.gbk'):
    file_path = get_gb_file_path(gb)
    for seq_record in SeqIO.parse(file_path, "genbank"):
        return seq_record


def get_gb(gb='test_genbank.gbk'):
    return get_gb_object(gb)
