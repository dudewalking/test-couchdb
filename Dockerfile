FROM couchdb

#install required dependencies
RUN apt-get update && \
    apt-get install -y libaio1 build-essential unzip wget python

#download and install node
RUN  wget https://nodejs.org/dist/v6.10.2/node-v6.10.2.tar.gz && \
     tar -xf node-v6.10.2.tar.gz && \
     cd node-v6.10.2 && \
     ./configure && \
     make && \
     make install && \
     rm -f ../node-v6.10.2.tar.gz

RUN mkdir -p app
WORKDIR /app

ADD package.json .

ADD . .

RUN chmod +x ./start.sh

RUN npm install

CMD ["./start.sh"]