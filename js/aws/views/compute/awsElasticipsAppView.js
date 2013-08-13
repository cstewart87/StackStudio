/*!
 * (c) Copyright 2012-2013 Transcend Computing, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*!
 * StackStudio 2.0.0-rc.1 <http://stackstudio.transcendcomputing.com>
 * (c) 2012 Transcend Computing <http://www.transcendcomputing.com/>
 * Available under ASL2 license <http://www.apache.org/licenses/LICENSE-2.0.html>
 */
/*jshint smarttabs:true */
/*global define:true console:true */
define([
        'jquery',
        'underscore',
        'backbone',
        'views/resource/resourceAppView',
        'text!templates/aws/compute/awsElasticIPAppTemplate.html',
        '/js/aws/models/compute/awsElasticIP.js',
        '/js/aws/collections/compute/awsElasticIPs.js',
        '/js/aws/views/compute/awsElasticIPsCreateView.js',
        '/js/aws/views/compute/awsElasticIPAssociateView.js',
        'icanhaz',
        'common',
        'jquery.dataTables'
], function( $, _, Backbone, ResourceAppView, awsElasticIPAppTemplate, Elasticip, Elasticips, AwsElasticIPsCreate, AwsElasticIpAssociate, ich, Common ) {
    'use strict';

    // Aws Security Group Application View
    // ------------------------------

    /**
     * AwsElasticIPsAppView is UI view list of aws key pairs.
     *
     * @name AwsElasticIPsAppView
     * @constructor
     * @category Resources
     * @param {Object} initialization object.
     * @returns {Object} Returns a AwsElasticIPsAppView instance.
     */
    var AwsElasticIPsAppView = ResourceAppView.extend({
        template: _.template(awsElasticIPAppTemplate),
        
        modelStringIdentifier: "public_ip",
        
        columns: ["public_ip", "server_id", "domain"],
        
        idColumnNumber: 0,
        
        model: Elasticip,
        
        collectionType: Elasticips,
        
        type: "compute",
        
        subtype: "elasticips",
        
        CreateView: AwsElasticIPsCreate,
        
        events: {
            'click .create_button': 'createNew',
            'click #action_menu ul li': 'performAction',
            'click #resource_table tr': "clickOne"
        },

        initialize: function(options) {
            if(options.cred_id) {
                this.credentialId = options.cred_id;
            }
            if(options.region) {
                this.region = options.region;
            }
            this.render();
            
            var elasticIpApp = this;
            Common.vent.on("elasticIPAppRefresh", function() {
                elasticIpApp.render();
            });
        },
        
        toggleActions: function(e) {
            //Disable any needed actions
        },
        
        performAction: function(event) {
            var elasticIp = this.collection.get(this.selectedId);
            
            switch(event.target.text)
            {
            case "Release Address":
                elasticIp.destroy(this.credentialId, this.region);
                break;
            case "Associate Address":
                new AwsElasticIpAssociate({cred_id: this.credentialId, region: this.region, elastic_ip: elasticIp});
                break;
            case "Disassociate Address":
                elasticIp.disassociateAddress(this.credentialId, this.region);
                break;
            }
        }
    });
    
    return AwsElasticIPsAppView;
});
