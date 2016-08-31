exports.render = function(morph) {
    if (!morph.props.relatedTag) {
        return {
            body: {
                message: 'You have not specified a name'
            }
        };
    }

   function getCurationInfo () { 
        return morph.request({
            curation: {
               uri: {
                   service: 'curation',
                   path: '/streammetadata',
                   query: {'relatedTag': morph.props.relatedTag} 
               },
               requireSuccess: true
            }
        })
    };

    function getLdpInfo () { 
        return morph.request({
            ldp: {
               uri: {
                   service: 'ldp-core',
                   path: '/tag-concepts',
                   query: {'uri': morph.props.relatedTag} 
               },
               requireSuccess: true
            }
        })
    };

    function getCurationMode (response) {
        return response.curation
    };


    return getCurationInfo()
        .then((response) => response.curation)
};