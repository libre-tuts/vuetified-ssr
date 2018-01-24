<?php

namespace Api\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;
use App\Model\User;

class UpdateUserEmailMutation extends Mutation
{
    protected $attributes = [
        'name' => 'UpdateUserEmail'
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
            'email' => [
                'name' => 'email',
                'type' => Type::nonNull(Type::string())
            ]
        ];
    }

    public function rules(array $args = [])
    {
        return [
            'id' => ['required'],
            'email' => ['required', 'email']
        ];
    }

    public function resolve($root, $args)
    {
        $user = User::find($args['id']);

        if (!$user) {
            return null;
        }

        $user->email = $args['email'];
        $user->save();

        return $user;
    }
}