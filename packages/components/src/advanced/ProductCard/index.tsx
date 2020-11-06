import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { ProductId } from 'rns-types';
import { ui } from 'rns-packages';
import { default as ProductCardTheme } from 'rns-theme/src/theme/components/ProductCard';

import { CacheableImage } from 'components/src/trivial/CacheableImage';
import { PlainText } from 'components/src/trivial/text/PlainText';
import { AppContext } from 'components/src/context';
import { Button } from 'components/src/trivial/buttons/Button';

interface ProductCardProps {
  id: ProductId;
  thumbnail: string;
  title: string;
  price: string;
  units?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const dispatch = useDispatch();
  const { id, thumbnail, title, units, price } = props;
  return (
    <Button onPress={(): unknown => dispatch(ui.actionSetCurrentProduct.start(id))}>
      <View style={ProductCardTheme.container}>
        <AppContext.Consumer>
          {({ imageCacherInterface }): JSX.Element => (
            <CacheableImage style={ProductCardTheme.image} src={thumbnail} imageCacheHoc={imageCacherInterface} />
          )}
        </AppContext.Consumer>
        <View style={{ height: 50, flex: 1, flexDirection: 'column' }}>
          <View>
            <PlainText style={ProductCardTheme.title} wrapLines={2}>
              {title}
            </PlainText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <PlainText style={ProductCardTheme.units}>{units}</PlainText>
            </View>
            <View>
              <PlainText style={ProductCardTheme.price}>{price}</PlainText>
            </View>
          </View>
        </View>
      </View>
    </Button>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  units: PropTypes.string
};
