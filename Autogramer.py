from pymatgen.core import Composition
from time import sleep
#化合物の組成式を入力
comp_name = input("Target compound name:\n")
gram = input("Target compound weight(g)\n")
comp = Composition(comp_name)
#化合物の分子量を出力
print("Weight of {} per mol:\n{:.3f}\n".format(comp_name,comp.weight))
comp_mol = int(gram)/comp.weight
print("mol of compound:{:.5f}".format(comp_mol))

mat_list = []
mol_list = []
#nが入力されるまで原料化合物の入力
while input("Calculate other compound? (y/n):") == "y":
    #化合物の組成式を入力
    mat_list.append(input("compound name:"))
    mol_list.append(input("composition ratio:"))
    
#入力された化合物の必要量を表示
for i in range(len(mat_list)):
    print("{}:\n{:.4}g\n".format(mat_list[i],Composition(mat_list[i]).weight*float(mol_list[i])*comp_mol))

sleep(60)