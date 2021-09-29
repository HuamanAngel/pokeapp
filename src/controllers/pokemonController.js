const Pokemon = require('../models/pokemon');

// Metodo para mostrar todos los pokemones
exports.showAll = async (req,res,next)=>{
    let mandarina={title: 'Pagina 1',
        layout:'layouts/layoutadmin'
    };

    try {

        const pokemonAllDB = await Pokemon.find({});
        mandarina['pokemon']=[...pokemonAllDB];
        res.render('pages/v_homePokemon',mandarina);

    } catch (error) {
        console.log(error);
    }
};

// Metodos para crear nuevos pokemones
exports.create = (req,res,next)=>{
    res.render('pages/v_createPokemon',{title: "Creacion de pokemon",layout: 'layouts/layoutadmin'});
};

exports.store = async (req,res,next)=>{
    let pokemonStore = new Pokemon({
        name: req.body.pokemon_name,
        description: req.body.pokemon_description,
        type: req.body.pokemon_type,
        image: req.body.pokemon_image
    
    });
    try {
        await pokemonStore.save();
        res.redirect('/pokemon/show/all');

    } catch (error) {
        console.log(error);    
    }
};

// Edicion de pokemon

exports.showOne = async (req,res,next)=>{
    const idPokemon = req.params.id;

    let onePokemonDB={title: 'Mi pokemon',
        layout:'layouts/layoutadmin',
        error: false
    };
    try {

        const pokemonDB = await Pokemon.findOne({_id: idPokemon});
        onePokemonDB['pokemon']=pokemonDB; 
        res.render('pages/v_onePokemon',onePokemonDB);
    } catch (error) {
        console.log(error);
        onePokemonDB['error']= true;
        onePokemonDB['message']= "No se encontro el id";
        res.render('pages/v_onePokemon',onePokemonDB);

    };
};

exports.editOne = async(req,res,next)=>{
    const idPokemon = req.params.id;
    const form = req.body;
    try {
        await Pokemon.findByIdAndUpdate(idPokemon,{description: form.pokemon_description},{useFindAndModify: false});
        res.redirect('/pokemon/show/all');

    } catch (error) {
        console.log(error);    
    }

};

exports.deleteOne = async(req,res,next)=>{
    const idPokemon = req.params.id;
    try {
        await Pokemon.findByIdAndDelete({_id: idPokemon});
        res.redirect('/pokemon/show/all');
    } catch (error) {
        console.log(error);
    }
};