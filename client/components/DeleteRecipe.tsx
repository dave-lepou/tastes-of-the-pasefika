import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { deleteRecipe } from '../apis/recipes.ts'

interface Props {
  id: number
}

export default function DeleteRecipe({ id }: Props) {
  const qc = useQueryClient()
  const navigate = useNavigate()

  const deleteMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recipes'] })
      navigate('/')
    },
  })

  const handleDelete = () => {
    console.log('deleting recipe', id)
    deleteMutation.mutate()
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        className="pasa-delete-btn"
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete Recipe'}
      </button>
    </>
  )
}
