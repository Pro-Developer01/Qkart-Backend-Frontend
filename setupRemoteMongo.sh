# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb://ac-ezdnokv-shard-00-00.mqqpklj.mongodb.net:27017,ac-ezdnokv-shard-00-01.mqqpklj.mongodb.net:27017,ac-ezdnokv-shard-00-02.mqqpklj.mongodb.net:27017/?replicaSet=atlas-1bu3n2-shard-0" --ssl --authenticationDatabase admin --username yadavshashank70 --password Mm8948492799 --drop --collection users --file data/export_qkart_users.json
mongoimport --uri "mongodb://ac-ezdnokv-shard-00-00.mqqpklj.mongodb.net:27017,ac-ezdnokv-shard-00-01.mqqpklj.mongodb.net:27017,ac-ezdnokv-shard-00-02.mqqpklj.mongodb.net:27017/?replicaSet=atlas-1bu3n2-shard-0" --ssl --authenticationDatabase admin --username yadavshashank70 --password Mm8948492799 --drop --collection products --file data/export_qkart_products.json

