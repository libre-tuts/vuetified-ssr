<?php

use Api\GraphQL\Mutation\NewUserMutation;
use Api\GraphQL\Mutation\UpdateUserNameMutation;
use Api\GraphQL\Mutation\UpdateUserEmailMutation;
use Api\GraphQL\Mutation\UpdateUserPasswordMutation;

use Api\GraphQL\Query\MyProfileQuery;
use Api\GraphQL\Query\UsersQuery;

use Api\GraphQL\Type\MyProfileType;
use Api\GraphQL\Type\UserProfilesType;
use Api\GraphQL\Type\UsersType;

return [

    'prefix' => 'graphql',

    
    'routes' => '{graphql_schema?}',

    'controllers' => \Rebing\GraphQL\GraphQLController::class . '@query',

    'middleware' => [],

    'default_schema' => 'default',

    'schemas' => [
        'default' => [
            'query' => [
                'users' => UsersQuery::class,
                'myprofile' => MyProfileQuery::class,
            ],
            'mutation' => [
                'newUser' => NewUserMutation::class,
                'updateUserName' => UpdateUserNameMutation::class,
                'updateUserEmail' => UpdateUserEmailMutation::class,
                'updatePassword' => UpdateUserPasswordMutation::class
            ],
            'middleware' => []
        ],
    ],
    
    'types' => [
        'users'  => UsersType::class,
        'user_profile'  => UserProfilesType::class,
        'my_profile'  => MyProfileType::class
    ],
    
    'error_formatter' => ['\Rebing\GraphQL\GraphQL', 'formatError'],

    // You can set the key, which will be used to retrieve the dynamic variables
    'params_key'    => 'params',
    
];
