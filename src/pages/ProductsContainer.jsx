import React, { useState } from 'react';
import axios from 'axios';
import { useConfig } from '../../context/ConfigContext';

export default function Products() {
  const { apiUrl } = useConfig();

  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    variations: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVariationChange = (index, e) => {
    const { name, value } = e.target;
    const newVariations = [...formData.variations];
    newVariations[index] = {
      ...newVariations[index],
      [name]: name === 'urls' ? value.split(',').map(url => url.trim()) : value
    };
    setFormData({
      ...formData,
      variations: newVariations
    });
  };

  const handleSizeChange = (variationIndex, sizeIndex, e) => {
    const { name, value } = e.target;
    const newVariations = [...formData.variations];
    newVariations[variationIndex].sizes[sizeIndex] = {
      ...newVariations[variationIndex].sizes[sizeIndex],
      [name]: value
    };
    setFormData({
      ...formData,
      variations: newVariations
    });
  };

  const handleAddVariation = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      variations: [...prevFormData.variations, { name: '', description: '', color: '', urls: [], sizes: [] }]
    }));
  };

  const handleRemoveVariation = (index) => {
    setFormData(prevFormData => {
      const newVariations = prevFormData.variations.filter((_, i) => i !== index);
      return {
        ...prevFormData,
        variations: newVariations
      };
    });
  };

  const handleAddSize = (variationIndex) => {
    const newVariations = [...formData.variations];
    newVariations[variationIndex].sizes.push({ size: '', price: 0, quantityAvailable: 0, inStockSize: false });
    setFormData({
      ...formData,
      variations: newVariations
    });
  };

  const handleRemoveSize = (variationIndex, sizeIndex) => {
    const newVariations = [...formData.variations];
    newVariations[variationIndex].sizes = newVariations[variationIndex].sizes.filter((_, i) => i !== sizeIndex);
    setFormData({
      ...formData,
      variations: newVariations
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados a serem enviados:", formData);
    try {
      const response = await axios.post(`${apiUrl}/api/products`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erro ao criar produto.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '5rem', display: "flex", flexDirection: "column" }}>
      <input
        type="text"
        name="category"
        placeholder="Categoria"
        onChange={handleChange}
        value={formData.category}
        required
      />
      <input
        type="text"
        name="subcategory"
        placeholder="Subcategoria"
        onChange={handleChange}
        value={formData.subcategory}
      />

      <button type="button" onClick={handleAddVariation} style={{ marginTop: '10px' }}>
        Adicionar Variação
      </button>

      {formData.variations.map((variation, index) => (
        <div key={index} style={{ marginBottom: '10px', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            name="name"
            placeholder="Nome da Variação"
            value={variation.name}
            onChange={(e) => handleVariationChange(index, e)}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={variation.description}
            onChange={(e) => handleVariationChange(index, e)}
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Cor"
            value={variation.color}
            onChange={(e) => handleVariationChange(index, e)}
            required
          />
          <input
            type="text"
            name="urls"
            placeholder="URLs de Imagens (separadas por vírgula)"
            value={variation.urls.join(',')}
            onChange={(e) => handleVariationChange(index, e)}
            required
          />

          <button type="button" onClick={() => handleAddSize(index)} style={{ marginTop: '10px' }}>
            Adicionar Tamanho
          </button>

          {variation.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
              <input
                type="text"
                name="size"
                placeholder="Tamanho"
                value={size.size}
                onChange={(e) => handleSizeChange(index, sizeIndex, e)}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Preço"
                value={size.price}
                onChange={(e) => handleSizeChange(index, sizeIndex, e)}
                required
              />
              <input
                type="number"
                name="quantityAvailable"
                placeholder="Quantidade Disponível"
                value={size.quantityAvailable}
                onChange={(e) => handleSizeChange(index, sizeIndex, e)}
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="inStockSize"
                  checked={size.inStockSize}
                  onChange={(e) => handleSizeChange(index, sizeIndex, { target: { name: 'inStockSize', value: e.target.checked } })}
                />
                Em Estoque
              </label>

              <button
                type="button"
                onClick={() => handleRemoveSize(index, sizeIndex)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#DC143C',
                  color: 'white',
                  border: 'none',
                  padding: '.5rem',
                  borderRadius: '1rem',
                  fontFamily: 'poppins',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: '.8rem',
                  whiteSpace: 'nowrap',
                  marginTop: '10px'
                }}
              >
                Remover Tamanho
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleRemoveVariation(index)}
            style={{
              marginLeft: '10px',
              backgroundColor: '#DC143C',
              color: 'white',
              border: 'none',
              padding: '.5rem',
              borderRadius: '1rem',
              fontFamily: 'poppins',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '.8rem',
              whiteSpace: 'nowrap',
              marginTop: '10px'
            }}
          >
            Remover Variação
          </button>
        </div>
      ))}

      <button type="submit" style={{
        marginTop: '20px',
        backgroundColor: '#008000',
        color: 'white',
        border: 'none',
        padding: '1rem',
        borderRadius: '1rem',
        fontFamily: 'poppins',
        fontWeight: 500,
        cursor: 'pointer',
        fontSize: '1rem',
        whiteSpace: 'nowrap',
      }}>
        Criar Produto
      </button>
    </form>
  );
}
