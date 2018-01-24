<?php

namespace Api\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;
use App\Model\User;

class UpdateUserPasswordMutation extends Mutation
{
    protected $attributes = [
        'name' => 'UpdateUserPassword'
    ];

    public function type()
    {
        return GraphQL::type('users');
    }

    public function args()
    {
        return [
            'id' => [
                'name' => 'id', 
                'type' => Type::nonNull(Type::int())
            ],
            'password' => [
                'name' => 'password', 
                'type' => Type::nonNull(Type::string())
            ]
        ];
    }

    public function resolve($root, $args)
    {
        $user = User::find($args['id']);

        if (!$user) {
            return null;
        }

        $user->password = $args['password'];
        $user->save();

        return $user;
    }
}