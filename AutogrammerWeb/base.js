//周期表を読み込み
var json = '{"Ac": 227.0, "Ag": 107.8682, "Al": 26.9815386, "Am": 243.0, "Ar": 39.948, "As": 74.9216, "At": 210.0, "Au": 196.966569, "B": 10.811, "Ba": 137.327, "Be": 9.012182, "Bi": 208.9804, "Bk": 247.0, "Br": 79.904, "C": 12.0107, "Ca": 40.078, "Cd": 112.411, "Ce": 140.116, "Cf": 251.0, "Cl": 35.453, "Cm": 247.0, "Co": 58.933195, "Cr": 51.9961, "Cs": 132.9054519, "Cu": 63.546, "Dy": 162.5, "Er": 167.259, "Es": 252.0, "Eu": 151.964, "F": 18.9984032, "Fe": 55.845, "Fm": 257.0, "Fr": 223.0, "Ga": 69.723, "Gd": 157.25, "Ge": 72.64, "H": 1.00794, "He": 4.002602, "Hf": 178.49, "Hg": 200.59, "Ho": 164.93032, "I": 126.90447, "In": 114.818, "Ir": 192.217, "K": 39.0983, "Kr": 83.798, "La": 138.90547, "Li": 6.941, "Lr": 262.0, "Lu": 174.967, "Md": 258.0, "Mg": 24.305, "Mn": 54.938045, "Mo": 95.94, "N": 14.0067, "Na": 22.98976928, "Nb": 92.90638, "Nd": 144.242, "Ne": 20.1797, "Ni": 58.6934, "No": 259.0, "Np": 237.0, "O": 15.9994, "Os": 190.23, "P": 30.973762, "Pa": 231.03588, "Pb": 207.2, "Pd": 106.42, "Pm": 145.0, "Po": 210.0, "Pr": 140.90765, "Pt": 195.084, "Pu": 244.0, "Ra": 226.0, "Rb": 85.4678, "Re": 186.207, "Rh": 102.9055, "Rn": 220.0, "Ru": 101.07, "S": 32.065, "Sb": 121.76, "Sc": 44.955912, "Se": 78.96, "Si": 28.0855, "Sm": 150.36, "Sn": 118.71, "Sr": 87.62, "Ta": 180.94788, "Tb": 158.92535, "Tc": 98.0, "Te": 127.6, "Th": 232.03806, "Ti": 47.867, "Tl": 204.3833, "Tm": 168.93421, "U": 238.02891, "V": 50.9415, "W": 183.84, "Xe": 131.293, "Y": 88.90585, "Yb": 173.04, "Zn": 65.409, "Zr": 91.224}';

per_table = JSON.parse(json);

console.log(per_table.count);
console.log(per_table["Ag"] * 2);


function calculateMass(obj){
    //入力値
    var total_mass = 0;
    var comp_name=obj.value;
    var dom = document.getElementById("mass");
    dom.innerHTML = getMassofComposition(comp_name) + " g";//per_table[str];
}
//組成式を各元素とその数に分割（Bi2O3→[Bi2,O3])
function parseCompound(Compound){
    var re = /[A-Z][a-z]*[0-9]*\.*[0-9]*/g
    var splits = Compound.match(re);
    console.log(splits);
    return splits;
}
//元素と数を分割し、その重さを算出（Bi2→208.98 * 2)
function getMassofSpecie(Specie){
    var re = /[A-Z][a-z]*|[0-9]+\.*[0-9]*/g
    var splits = Specie.match(re);
    console.log(splits);
    if(splits.length == 2){
        return per_table[splits[0]] * Number(splits[1]);
    }else{
        return per_table[splits[0]];
    }
}

//入力の組成式の重さを返す
function getMassofComposition(comp_name){
    Species = parseCompound(comp_name);
    var total_mass=0;
    for(let i in Species){
        total_mass += getMassofSpecie(Species[i]);
    }
    return total_mass.toFixed(5);
}
//入力された重量の物質量を算出
function getMolbyMass(){
    var mass =  Number(document.getElementById("comp_mass").value);
    var comp_name = document.getElementById("comp_formula").value;
    //組成式のモル質量を算出
    var mol_mass = getMassofComposition(comp_name);
    return mass/mol_mass;
}

//入力物質の物質量を表示
function showMolbyMass(){
    var mol = getMolbyMass();
    var dom = document.getElementById("mol");
    dom.innerHTML = mol.toFixed(5);
}

//他の化合物の重さと比率から重さを算出し表示
function calculateOthersMass(){
    //他の化合物の重さを取得
    var comp_masses = getOthersMass();
    //他の化合物の組成比を取得
    var comp_mols = getOthersMols();
    //目標化合物の物質量
    var target_mol = getMolbyMass();
    //各値を計算し、重さを書き込み
    var elements = document.getElementsByClassName("calc_mass");
    for(let i in comp_masses){
        var comp_mass = comp_masses[i] * Number(comp_mols[i].value) * target_mol;
        elements[i].innerHTML = "mass:" + String(comp_mass.toFixed(5)) + " g";
    }
}
//入力表から他の化合物の組成を取得し、モル質量を返す
function getOthersMass(){
    var elements = document.getElementsByClassName("comp_name");
    var masses = [];
    for(let i in elements){
        if(elements[i].value != undefined){
            console.log(elements[i].value);
            masses.push(getMassofComposition(elements[i].value));
        }
    }
    return masses;
}
//入力表から他の化合物の物質量を取得
function getOthersMols(){
    var elements = document.getElementsByClassName("comp_mol");
    return elements;
}


//実験用関数
function dammy(){
    var elements = document.getElementsByClassName("comp_name");
    for(let i in elements){
        console.log(elements[i].value);
    }
}