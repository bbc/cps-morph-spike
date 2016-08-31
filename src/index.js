exports.render = function(morph) {
    if (!morph.props.uri) {
        return {
            body: {
                message: 'You have not specified a name'
            }
        };
    }

    return morph.request({
           thing: {
               uri: {
                   service: 'ldp-core',
                   path: '/tag-concepts',
                   query: {'uri': morph.props.uri} 
               },
               requireSuccess: true
           }
        })
    .then((response) => response.thing);
};

