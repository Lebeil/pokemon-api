const validTypes = ['Plante','Poison','Feu','Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris!'
        },
        validate: {
          notEmpty: {msg: 'Veuillez saisir un nom'},
          notNull: {msg: 'Non requis'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: "Utilisez uniquement des nombres entiers."},
          min: {
            args: [0],
            msg: 'valeur mini'
          },
          max: {
            args: [999],
            msg: 'Valeur maxi'
          },
          notNull: {msg: "Les points de vie sont une propriété requise"},
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Veuillez saisir un nombre uniquement'},
          notNull: {msg: 'c\'est requis'},
          min: {
            args: [0],
            msg: 'valeur mini'
          },
          max: {
            args: [99],
            msg: 'Valeur maxi'
          },
        }
      },
      picture: { 
        type: DataTypes.STRING, 
        allowNull: false,
        isUrl: {msg: "Veuillez saisir une adresse web"},
        notNull: {msg: "C'est requis"} 
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value){
            if(!value){
              throw new Error("Un pokemon doit au moins avoir un type.")
            }
            if(value.split(',').length > 3){
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types.")
            }
            value.split(',').forEach(type=> {
              if(!validTypes.includes(type)){
                throw new Error(`Le types d'un pokemon doit appartenir à la liste suivante: ${validTypes}`)
              }
            })
          }
        }
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
