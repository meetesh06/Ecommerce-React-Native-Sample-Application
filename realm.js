import Realm from 'realm';

let realmdb = null;

const Products = {
  name: 'Products',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: 'string',
    description: 'string',
    price: 'string',
    seller_email: 'string',
    shop_name: 'string',
    media: 'string',
    sales: 'string',
    timestamp: 'date'
  }
};

export default {
  getRealm: (callback) => {
    if (realmdb === null) {
      return Realm.open({
        schema: [Products],
        deleteRealmIfMigrationNeeded: true
      })
        .then((realm) => {
          realmdb = realm;
          callback(realmdb);
        });
    }
    callback(realmdb);
    return true;
  }
};
